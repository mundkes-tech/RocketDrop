package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.model.DropQueue;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.repository.ProductRepository;
import com.rocketdrop.backend.service.QueueService;
import com.rocketdrop.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    private final QueueService queueService;
    private final UserService userService;
    private final ProductRepository productRepository;

    public QueueController(QueueService queueService, UserService userService, ProductRepository productRepository) {
        this.queueService = queueService;
        this.userService = userService;
        this.productRepository = productRepository;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<DropQueue>> getQueue(@PathVariable Long productId) {
        return ResponseEntity.ok(queueService.getQueue(productId));
    }

    @GetMapping("/{productId}/position")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Integer> getPosition(@PathVariable Long productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = userService.getIdByEmail(email);
        return ResponseEntity.ok(queueService.getPosition(productId, userId));
    }

    @PostMapping("/{productId}/join")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<DropQueue> joinQueue(@PathVariable Long productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByEmail(email);
        DropQueue entry = queueService.joinQueue(user, productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found")));
        return ResponseEntity.ok(entry);
    }

    @PostMapping("/{productId}/leave")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Void> leaveQueue(@PathVariable Long productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByEmail(email);
        queueService.leaveQueue(user, productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found")));
        return ResponseEntity.ok().build();
    }
}
