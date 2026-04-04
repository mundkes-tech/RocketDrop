package com.rocketdrop.backend.dto.product;

import com.rocketdrop.backend.model.Product;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductSearchResponse {
    private List<Product> products;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
}