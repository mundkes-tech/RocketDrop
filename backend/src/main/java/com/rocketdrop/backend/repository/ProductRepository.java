package com.rocketdrop.backend.repository;

import com.rocketdrop.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.dropTime IS NOT NULL ORDER BY p.dropTime DESC")
    List<Product> findDrops();

    @Query("SELECT p FROM Product p WHERE p.stock > 0 AND (p.dropTime IS NULL OR p.dropTime <= CURRENT_TIMESTAMP)")
    List<Product> findAvailableProducts();

    List<Product> findTop8ByCategoryIdAndIdNot(Long categoryId, Long id);
}