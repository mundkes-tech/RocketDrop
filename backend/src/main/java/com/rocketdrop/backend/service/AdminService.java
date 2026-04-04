package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.Category;
import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.model.ProductImage;
import com.rocketdrop.backend.repository.CategoryRepository;
import com.rocketdrop.backend.repository.ProductImageRepository;
import com.rocketdrop.backend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class AdminService {
    private static final Logger log = LoggerFactory.getLogger(AdminService.class);

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;

    public AdminService(ProductRepository productRepository,
                        CategoryRepository categoryRepository,
                        ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productImageRepository = productImageRepository;
    }

    @Transactional
    public Product addProduct(String name, String description, Double price, Integer stock,
                              Long categoryId, LocalDateTime dropTime, List<String> imageUrls) {
        List<String> safeImageUrls = imageUrls == null ? Collections.emptyList() : imageUrls;

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(BigDecimal.valueOf(price));
        product.setStock(stock);
        product.setCategory(category);
        product.setDropTime(dropTime);
        product.setCreatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);

        // Save images
        for (int i = 0; i < safeImageUrls.size(); i++) {
            String url = safeImageUrls.get(i);
            ProductImage image = new ProductImage();
            image.setProduct(savedProduct);
            image.setImageUrl(url);
            image.setIsPrimary(i == 0);
            productImageRepository.save(image);
        }

        log.info("Saved product id={} with {} image urls", savedProduct.getId(), safeImageUrls.size());

        return savedProduct;
    }

    @Transactional
    public Product updateProduct(Long productId, String name, String description, Double price,
                                 Integer stock, Long categoryId, LocalDateTime dropTime,
                                 boolean updateDropTime, List<String> imageUrls) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (name != null) {
            product.setName(name);
        }

        if (description != null) {
            product.setDescription(description);
        }

        if (price != null) {
            product.setPrice(BigDecimal.valueOf(price));
        }

        if (stock != null) {
            product.setStock(stock);
        }

        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        // Only modify drop time when explicitly requested by the client.
        if (updateDropTime) {
            product.setDropTime(dropTime);
        }

        Product updatedProduct = productRepository.save(product);

        if (imageUrls != null) {
            productImageRepository.deleteByProductId(productId);
            for (int i = 0; i < imageUrls.size(); i++) {
                String url = imageUrls.get(i);
                ProductImage image = new ProductImage();
                image.setProduct(updatedProduct);
                image.setImageUrl(url);
                image.setIsPrimary(i == 0);
                productImageRepository.save(image);
            }
            log.info("Updated product id={} with {} image urls", productId, imageUrls.size());
        }

        return updatedProduct;
    }

    @Transactional
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Transactional
    public Category addCategory(String name, String imageUrl) {
        Category category = new Category();
        category.setName(name);
        category.setImageUrl(imageUrl);
        Category saved = categoryRepository.save(category);
        log.info("Saved category id={} with imageUrl={}", saved.getId(), saved.getImageUrl());
        return saved;
    }

    @Transactional
    public Category updateCategory(Long categoryId, String name, String imageUrl) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(name);
        category.setImageUrl(imageUrl);
        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}