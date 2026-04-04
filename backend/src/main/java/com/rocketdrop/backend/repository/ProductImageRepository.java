package com.rocketdrop.backend.repository;

import com.rocketdrop.backend.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
	void deleteByProductId(Long productId);
}