package com.rocketdrop.backend.repository;

import com.rocketdrop.backend.model.DropQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DropQueueRepository extends JpaRepository<DropQueue, Long> {
    List<DropQueue> findByProductIdOrderByPositionAsc(Long productId);
    int countByProductId(Long productId);
}