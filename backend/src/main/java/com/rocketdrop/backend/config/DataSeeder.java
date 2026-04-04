package com.rocketdrop.backend.config;

import com.rocketdrop.backend.model.*;
import com.rocketdrop.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.admin.email:admin@rocketdrop.com}")
    private String defaultAdminEmail;

    @Value("${app.seed.admin.password:admin123}")
    private String defaultAdminPassword;

    @Value("${app.seed.ops.email:ops@rocketdrop.com}")
    private String defaultOpsEmail;

    @Value("${app.seed.ops.password:admin123}")
    private String defaultOpsPassword;

    @Value("${app.seed.ops.enabled:false}")
    private boolean opsSeedEnabled;

    @Override
    public void run(String... args) throws Exception {
        // Seed admin users only when missing; do not reset existing passwords on every startup.
        ensureAdminUser(defaultAdminEmail, defaultAdminPassword, "Admin");
        if (opsSeedEnabled) {
            ensureAdminUser(defaultOpsEmail, defaultOpsPassword, "Ops Admin");
        }

        if (userRepository.count() == 1 && productRepository.count() == 0 && categoryRepository.count() == 0) {
            // Create categories
            Category electronics = new Category();
            electronics.setName("Electronics");
            electronics.setImageUrl("https://example.com/electronics.jpg");
            categoryRepository.save(electronics);

            Category fashion = new Category();
            fashion.setName("Fashion");
            fashion.setImageUrl("https://example.com/fashion.jpg");
            categoryRepository.save(fashion);

            // Create products
            Product product1 = new Product();
            product1.setName("Wireless Headphones");
            product1.setDescription("High-quality wireless headphones");
            product1.setPrice(BigDecimal.valueOf(99.99));
            product1.setStock(50);
            product1.setDropTime(LocalDateTime.now().plusHours(2));
            product1.setCategory(electronics);
            productRepository.save(product1);

            Product product2 = new Product();
            product2.setName("Smart Watch");
            product2.setDescription("Latest smart watch with health tracking");
            product2.setPrice(BigDecimal.valueOf(199.99));
            product2.setStock(30);
            product2.setCategory(electronics);
            productRepository.save(product2);
        }
    }

    private void ensureAdminUser(String email, String rawPassword, String name) {
        String normalizedEmail = email == null ? "" : email.trim().toLowerCase();
        if (normalizedEmail.isEmpty()) {
            return;
        }

        User user = userRepository.findByEmailIgnoreCase(normalizedEmail).orElseGet(User::new);
        boolean isNew = user.getId() == null;

        user.setEmail(normalizedEmail);
        user.setName(name);
        user.setRole(User.Role.ADMIN);

        if (isNew) {
            user.setPassword(passwordEncoder.encode(rawPassword));
        }

        userRepository.save(user);
    }
}