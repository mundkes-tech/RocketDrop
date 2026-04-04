package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.service.UserService;
import com.rocketdrop.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@PreAuthorize("hasRole('CUSTOMER')")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<Long>> getWishlist() {
        return ResponseEntity.ok(wishlistService.getWishlistProductIds(getCurrentUserId()));
    }

    @PostMapping
    public ResponseEntity<Map<String, Long>> addToWishlist(@RequestBody Map<String, Long> request) {
        Long productId = request.get("productId");
        if (productId == null) {
            throw new RuntimeException("Missing productId");
        }

        Long addedProductId = wishlistService.addToWishlist(getCurrentUserId(), productId);
        return ResponseEntity.ok(Map.of("productId", addedProductId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long productId) {
        wishlistService.removeFromWishlist(getCurrentUserId(), productId);
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getIdByEmail(email);
    }
}