package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.model.Category;
import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.service.AdminService;
import com.rocketdrop.backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private static final Logger log = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;
    private final FileStorageService fileStorageService;

    @PostMapping(value = "/uploads/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            log.info("Received admin image upload: name={}, size={}", file.getOriginalFilename(), file.getSize());
            String url = fileStorageService.storeImage(file);
            log.info("Returning uploaded image url={}", url);
            return ResponseEntity.ok(Map.of("url", url));
        } catch (RuntimeException ex) {
            log.warn("Admin image upload failed: {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    // Products
    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        String description = (String) request.get("description");
        Double price = Double.valueOf(request.get("price").toString());
        Integer stock = Integer.valueOf(request.get("stock").toString());
        Long categoryId = Long.valueOf(request.get("categoryId").toString());
        
        // dropTime is optional - use current time if not provided
        LocalDateTime dropTime = null;
        Object dropTimeObj = request.get("dropTime");
        if (dropTimeObj != null && !dropTimeObj.toString().isBlank()) {
            dropTime = parseDateTime(dropTimeObj.toString());
        }
        
        @SuppressWarnings("unchecked")
        List<String> imageUrls = (List<String>) request.get("imageUrls");

        Product product = adminService.addProduct(name, description, price, stock, categoryId, dropTime, imageUrls);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        String description = (String) request.get("description");
        Double price = toNullableDouble(request.get("price"));
        Integer stock = toNullableInteger(request.get("stock"));
        Long categoryId = toNullableLong(request.get("categoryId"));

        // If key exists and value is empty/null, clear dropTime.
        LocalDateTime dropTime = null;
        boolean updateDropTime = request.containsKey("dropTime");
        if (updateDropTime) {
            Object dropTimeObj = request.get("dropTime");
            if (dropTimeObj != null && !dropTimeObj.toString().isBlank()) {
                dropTime = parseDateTime(dropTimeObj.toString());
            }
        }

        @SuppressWarnings("unchecked")
        List<String> imageUrls = request.containsKey("imageUrls")
                ? (List<String>) request.get("imageUrls")
                : null;

        Product product = adminService.updateProduct(productId, name, description, price, stock, categoryId, dropTime, updateDropTime, imageUrls);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        adminService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = adminService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Categories
    @PostMapping("/categories")
    public ResponseEntity<Category> addCategory(@RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        String imageUrl = (String) request.get("imageUrl");
        Category category = adminService.addCategory(name, imageUrl);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId, @RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        String imageUrl = (String) request.get("imageUrl");
        Category category = adminService.updateCategory(categoryId, name, imageUrl);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        adminService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = adminService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    private static LocalDateTime parseDateTime(String value) {
        try {
            return LocalDateTime.parse(value);
        } catch (Exception ignored) {
            try {
                return OffsetDateTime.parse(value).toLocalDateTime();
            } catch (Exception ignoredAgain) {
                return LocalDateTime.ofInstant(Instant.parse(value), ZoneId.systemDefault());
            }
        }
    }

    private static Double toNullableDouble(Object value) {
        if (value == null || value.toString().isBlank()) return null;
        return Double.valueOf(value.toString());
    }

    private static Integer toNullableInteger(Object value) {
        if (value == null || value.toString().isBlank()) return null;
        return Integer.valueOf(value.toString());
    }

    private static Long toNullableLong(Object value) {
        if (value == null || value.toString().isBlank()) return null;
        return Long.valueOf(value.toString());
    }
}