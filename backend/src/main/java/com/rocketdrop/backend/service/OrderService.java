package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.*;
import com.rocketdrop.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WebSocketService webSocketService;
    private final QueueService queueService;
        private final EmailNotificationService emailNotificationService;
        private final CouponService couponService;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        CartItemRepository cartItemRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository,
                        WebSocketService webSocketService,
                        QueueService queueService,
                        EmailNotificationService emailNotificationService,
                        CouponService couponService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.webSocketService = webSocketService;
        this.queueService = queueService;
        this.emailNotificationService = emailNotificationService;
        this.couponService = couponService;
    }

    @Transactional
    public Order placeOrder(Long userId, Long addressId, String couponCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Address not found"));

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setStatus(Order.OrderStatus.PLACED);
        order.setCreatedAt(LocalDateTime.now());

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> createdOrderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItemRepository.save(orderItem);
            createdOrderItems.add(orderItem);

            totalPrice = totalPrice.add(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            // Update stock
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            // Broadcast stock update
            webSocketService.broadcastStockUpdate(product.getId(), product.getStock());
        }

        Coupon appliedCoupon = null;
        int discountPercentage = 0;
        if (couponCode != null && !couponCode.isBlank()) {
            appliedCoupon = couponService.getUsableCouponOrThrow(couponCode);
            discountPercentage = appliedCoupon.getDiscountPercentage() == null ? 0 : appliedCoupon.getDiscountPercentage();
        }

        if (discountPercentage > 0) {
            BigDecimal discountFactor = BigDecimal.valueOf(100 - discountPercentage)
                .divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
            totalPrice = totalPrice.multiply(discountFactor).setScale(2, RoundingMode.HALF_UP);
        }

        order.setTotalPrice(totalPrice);
        Order savedOrder = orderRepository.save(order);

        // Leave queue for purchased products and notify next customer in queue
        for (CartItem cartItem : cartItems) {
            queueService.leaveQueue(user, cartItem.getProduct());
            queueService.getNextInQueue(cartItem.getProduct().getId()).ifPresent(next -> {
                // send a direct status update to client, if required extension
                webSocketService.broadcastProductUpdate(cartItem.getProduct());
            });
        }

        // Clear cart
        cartItemRepository.deleteByUserId(userId);

        if (appliedCoupon != null) {
            couponService.markCouponUsed(appliedCoupon.getId());
        }

        emailNotificationService.sendOrderConfirmation(savedOrder, createdOrderItems);

        return savedOrder;
    }

    @Transactional
    public Order placeOrder(Long userId, Long addressId) {
        return placeOrder(userId, addressId, null);
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.OrderStatus.valueOf(status.toUpperCase()));
        Order savedOrder = orderRepository.save(order);

        // Broadcast order status update
        webSocketService.broadcastOrderUpdate(orderId, status);
        emailNotificationService.sendOrderStatusUpdate(savedOrder);

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }
}