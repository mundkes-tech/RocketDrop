package com.rocketdrop.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocketdrop.backend.model.CartItem;
import com.rocketdrop.backend.model.Cart;
import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.repository.CartRepository;
import com.rocketdrop.backend.repository.CartItemRepository;
import com.rocketdrop.backend.repository.ProductRepository;
import com.rocketdrop.backend.repository.UserRepository;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository,
                       CartRepository cartRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private Long ensureCartId(User user) {
        return cartRepository.findByUserId(user.getId())
                .map(Cart::getId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart).getId();
                });
    }

    @Transactional
    public CartItem addToCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Long cartId = ensureCartId(user);

        // Check if item already in cart
        CartItem existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId).orElse(null);
        if (existingItem != null) {
            if (existingItem.getCartId() == null) {
                existingItem.setCartId(cartId);
            }
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            return cartItemRepository.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setCartId(cartId);
            return cartItemRepository.save(cartItem);
        }
    }

    @Transactional
    public CartItem updateCartItem(Long userId, Long productId, int quantity) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public void removeFromCart(Long userId, Long productId) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItemRepository.delete(cartItem);
    }

    public List<CartItem> getCart(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}