package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.Product;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void broadcastStockUpdate(Long productId, Integer newStock) {
        messagingTemplate.convertAndSend("/topic/stock/" + productId, newStock);
        messagingTemplate.convertAndSend("/topic/stock", (Object) Map.of("productId", productId, "stock", newStock));
    }

    public void broadcastProductUpdate(Product product) {
        messagingTemplate.convertAndSend("/topic/product/" + product.getId(), product);
    }

    public void broadcastOrderUpdate(Long orderId, String status) {
        messagingTemplate.convertAndSend("/topic/order/" + orderId, status);
    }
}