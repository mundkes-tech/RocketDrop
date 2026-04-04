package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.model.CartItem;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.service.CartService;
import com.rocketdrop.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@PreAuthorize("hasRole('CUSTOMER')")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getIdByEmail(email);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart() {
        Long userId = getCurrentUserId();
        List<CartItem> cart = cartService.getCart(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody Map<String, Object> request) {
        Long userId = getCurrentUserId();
        Long productId = Long.valueOf(request.get("productId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());
        CartItem cartItem = cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long productId, @RequestBody Map<String, Integer> request) {
        Long userId = getCurrentUserId();
        int quantity = request.get("quantity");
        CartItem cartItem = cartService.updateCartItem(userId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId) {
        Long userId = getCurrentUserId();
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        Long userId = getCurrentUserId();
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}