package com.rocketdrop.backend.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String role;
}