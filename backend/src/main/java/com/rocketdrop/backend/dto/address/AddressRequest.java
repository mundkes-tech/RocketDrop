package com.rocketdrop.backend.dto.address;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddressRequest {
    private String label;

    @NotBlank
    private String line1;

    private String line2;
    private String city;
    private String state;
    private String zip;
    private String country;
}