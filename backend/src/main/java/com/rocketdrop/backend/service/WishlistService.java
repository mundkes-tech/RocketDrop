package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.model.WishlistItem;
import com.rocketdrop.backend.repository.ProductRepository;
import com.rocketdrop.backend.repository.UserRepository;
import com.rocketdrop.backend.repository.WishlistItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<Long> getWishlistProductIds(Long userId) {
        return wishlistItemRepository.findByUserId(userId)
                .stream()
                .map(item -> item.getProduct().getId())
                .toList();
    }

    @Transactional
    public Long addToWishlist(Long userId, Long productId) {
        if (wishlistItemRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            return productId;
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WishlistItem item = new WishlistItem();
        item.setUser(user);
        item.setProduct(product);
        wishlistItemRepository.save(item);

        return productId;
    }

    @Transactional
    public void removeFromWishlist(Long userId, Long productId) {
        wishlistItemRepository.deleteByUserIdAndProductId(userId, productId);
    }
}