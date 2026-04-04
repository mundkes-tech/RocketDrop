package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.dto.auth.AuthResponse;
import com.rocketdrop.backend.dto.auth.LoginRequest;
import com.rocketdrop.backend.dto.auth.RegisterRequest;
import com.rocketdrop.backend.dto.user.UserResponse;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private String normalizeRole(User.Role role) {
        if (role == null) {
            return "CUSTOMER";
        }
        String value = role.name();
        return value.startsWith("ROLE_") ? value.substring(5) : value;
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .role(normalizeRole(user.getRole()))
                .build();
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request.getEmail(), request.getPassword(), request.getName(), request.getPhone());
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(token, toUserResponse(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        User user = authService.getCurrentUser(token);
        return ResponseEntity.ok(new AuthResponse(token, toUserResponse(user)));
    }
}