package com.rocketdrop.backend.service;

import com.rocketdrop.backend.dto.product.ProductSearchResponse;
import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getDrops() {
        return productRepository.findDrops();
    }

    public List<Product> getAvailableProducts() {
        return productRepository.findAvailableProducts();
    }

    public List<Product> getSimilarProducts(Long productId) {
        Product product = getProductById(productId);
        return productRepository.findTop8ByCategoryIdAndIdNot(product.getCategory().getId(), productId);
    }

    public ProductSearchResponse searchProducts(String keyword,
                                                Long category,
                                                BigDecimal minPrice,
                                                BigDecimal maxPrice,
                                                String availability,
                                                String sortBy,
                                                int page,
                                                int size) {
        Specification<Product> spec = (root, query, cb) -> cb.conjunction();

        if (keyword != null && !keyword.isBlank()) {
            String normalizedKeyword = "%" + keyword.trim().toLowerCase(Locale.ROOT) + "%";
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), normalizedKeyword));
        }

        if (category != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("id"), category));
        }

        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if (availability != null && !availability.isBlank()) {
            if ("IN_STOCK".equalsIgnoreCase(availability)) {
                spec = spec.and((root, query, cb) -> cb.greaterThan(root.get("stock"), 0));
            } else if ("SOLD_OUT".equalsIgnoreCase(availability)) {
                spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("stock"), 0));
            }
        }

        Pageable pageable = PageRequest.of(
                Math.max(0, page),
                Math.max(1, size),
                toSort(sortBy)
        );

        Page<Product> productPage = productRepository.findAll(spec, pageable);

        return ProductSearchResponse.builder()
                .products(productPage.getContent())
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .totalPages(productPage.getTotalPages())
                .totalElements(productPage.getTotalElements())
                .build();
    }

    private Sort toSort(String sortBy) {
        if ("priceAsc".equalsIgnoreCase(sortBy)) {
            return Sort.by(Sort.Direction.ASC, "price");
        }

        if ("priceDesc".equalsIgnoreCase(sortBy)) {
            return Sort.by(Sort.Direction.DESC, "price");
        }

        return Sort.by(Sort.Direction.DESC, "dropTime");
    }
}