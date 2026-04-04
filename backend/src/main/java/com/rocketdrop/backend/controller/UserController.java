package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.dto.user.PasswordChangeRequest;
import com.rocketdrop.backend.dto.user.UserProfileRequest;
import com.rocketdrop.backend.dto.user.UserResponse;
import com.rocketdrop.backend.model.User;
import com.rocketdrop.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private String normalizeRole(User.Role role) {
        if (role == null) {
            return "CUSTOMER";
        }
        String value = role.name();
        return value.startsWith("ROLE_") ? value.substring(5) : value;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        User user = userService.getById(getCurrentUserId());
        return ResponseEntity.ok(toResponse(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(@RequestBody UserProfileRequest request) {
        User user = userService.updateProfile(getCurrentUserId(), request.getName(), request.getPhone());
        return ResponseEntity.ok(toResponse(user));
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordChangeRequest request) {
        userService.changePassword(getCurrentUserId(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getIdByEmail(email);
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .role(normalizeRole(user.getRole()))
                .build();
    }
}