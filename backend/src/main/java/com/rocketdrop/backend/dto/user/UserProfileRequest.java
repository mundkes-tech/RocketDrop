package com.rocketdrop.backend.dto.user;

import lombok.Data;

@Data
public class UserProfileRequest {
    private String name;
    private String phone;
}