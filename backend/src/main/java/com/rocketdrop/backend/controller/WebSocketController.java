package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.model.DropQueue;
import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.repository.ProductRepository;
import com.rocketdrop.backend.service.QueueService;
import com.rocketdrop.backend.service.UserService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ProductRepository productRepository;
    private final QueueService queueService;
    private final UserService userService;

    // Simple in-memory viewer count (in production, use Redis)
    private final Map<Long, Integer> productViewers = new ConcurrentHashMap<>();

    public WebSocketController(SimpMessagingTemplate messagingTemplate, ProductRepository productRepository, QueueService queueService, UserService userService) {
        this.messagingTemplate = messagingTemplate;
        this.productRepository = productRepository;
        this.queueService = queueService;
        this.userService = userService;
    }

    @MessageMapping("/view/{productId}")
    public void handleView(@DestinationVariable Long productId, @Payload Map<String, String> message) {
        String action = message.get("action"); // "enter" or "leave"

        if ("enter".equals(action)) {
            productViewers.put(productId, productViewers.getOrDefault(productId, 0) + 1);
        } else if ("leave".equals(action)) {
            productViewers.put(productId, Math.max(0, productViewers.getOrDefault(productId, 0) - 1));
        }

        // Broadcast viewer count
        messagingTemplate.convertAndSend("/topic/viewers/" + productId, productViewers.get(productId));
    }

    @MessageMapping("/queue/{productId}")
    public void handleQueue(@DestinationVariable Long productId, @Payload Map<String, Object> message) {
        String action = (String) message.get("action"); // "join" or "leave"
        String userEmail = (String) message.get("email");

        if (userEmail == null) {
            messagingTemplate.convertAndSend("/topic/queue/" + productId, (Object) Map.of("error", "Missing user email"));
            return;
        }

        User user = userService.getByEmail(userEmail);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        if ("join".equals(action)) {
            DropQueue queueEntry = queueService.joinQueue(user, product);
            List<DropQueue> queueList = queueService.getQueue(productId);
            Map<String, Object> payload = Map.of(
                    "action", "joined",
                    "productId", productId,
                    "position", queueEntry.getPosition(),
                    "size", queueList.size(),
                    "queue", queueList
            );
            messagingTemplate.convertAndSend("/topic/queue/" + productId, (Object) payload);
            messagingTemplate.convertAndSend("/topic/queue", (Object) payload);
        } else if ("leave".equals(action)) {
            queueService.leaveQueue(user, product);
            List<DropQueue> queueList = queueService.getQueue(productId);
            Map<String, Object> payload = Map.of(
                    "action", "left",
                    "productId", productId,
                    "size", queueList.size(),
                    "queue", queueList
            );
            messagingTemplate.convertAndSend("/topic/queue/" + productId, (Object) payload);
            messagingTemplate.convertAndSend("/topic/queue", (Object) payload);
        } else {
            messagingTemplate.convertAndSend("/topic/queue/" + productId, (Object) Map.of("error", "Unknown action", "action", action));
        }
    }

    // Method to broadcast stock update
    public void broadcastStockUpdate(Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            messagingTemplate.convertAndSend("/topic/stock/" + productId, (Object) product.getStock());
        }
    }

    // Method to broadcast product update
    public void broadcastProductUpdate(Product product) {
        messagingTemplate.convertAndSend("/topic/product/" + product.getId(), product);
    }
}