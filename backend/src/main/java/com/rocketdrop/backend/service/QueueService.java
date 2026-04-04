package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.DropQueue;
import com.rocketdrop.backend.model.Product;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.repository.DropQueueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class QueueService {
    private final DropQueueRepository dropQueueRepository;

    public QueueService(DropQueueRepository dropQueueRepository) {
        this.dropQueueRepository = dropQueueRepository;
    }

    @Transactional
    public DropQueue joinQueue(User user, Product product) {
        int position = dropQueueRepository.countByProductId(product.getId()) + 1;
        DropQueue queueEntry = new DropQueue();
        queueEntry.setUser(user);
        queueEntry.setProduct(product);
        queueEntry.setPosition(position);
        return dropQueueRepository.save(queueEntry);
    }

    @Transactional
    public void leaveQueue(User user, Product product) {
        List<DropQueue> entries = dropQueueRepository.findByProductIdOrderByPositionAsc(product.getId());
        Optional<DropQueue> existing = entries.stream().filter(e -> e.getUser().getId().equals(user.getId())).findFirst();
        existing.ifPresent(entry -> {
            dropQueueRepository.delete(entry);
            // rebase positions
            int idx = 1;
            for (DropQueue item : dropQueueRepository.findByProductIdOrderByPositionAsc(product.getId())) {
                item.setPosition(idx++);
                dropQueueRepository.save(item);
            }
        });
    }

    public List<DropQueue> getQueue(Long productId) {
        return dropQueueRepository.findByProductIdOrderByPositionAsc(productId);
    }

    public int getPosition(Long productId, Long userId) {
        return dropQueueRepository.findByProductIdOrderByPositionAsc(productId).stream()
                .filter(entry -> entry.getUser().getId().equals(userId))
                .map(DropQueue::getPosition)
                .findFirst().orElse(-1);
    }

    public Optional<DropQueue> getNextInQueue(Long productId) {
        return dropQueueRepository.findByProductIdOrderByPositionAsc(productId).stream()
                .min(Comparator.comparing(DropQueue::getPosition));
    }
}