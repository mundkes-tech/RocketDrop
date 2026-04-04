package com.rocketdrop.backend.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private final Cloudinary cloudinary;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.cloudinary.enabled:false}")
    private boolean cloudinaryEnabled;

    @Value("${app.cloudinary.cloud-name:}")
    private String cloudinaryCloudName;

    @Value("${app.cloudinary.api-key:}")
    private String cloudinaryApiKey;

    @Value("${app.cloudinary.api-secret:}")
    private String cloudinaryApiSecret;

    @Value("${app.cloudinary.folder:rocketdrop}")
    private String cloudinaryFolder;

    public String storeImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Image file is required");
        }

        String contentType = file.getContentType() == null ? "" : file.getContentType();
        if (!contentType.startsWith("image/")) {
            throw new RuntimeException("Only image files are allowed");
        }

        // Keep server-side limit aligned with admin helper text.
        long maxBytes = 2L * 1024 * 1024;
        if (file.getSize() > maxBytes) {
            throw new RuntimeException("Image size should be 2MB or less");
        }

        if (cloudinaryConfigured()) {
            try {
                log.info("Uploading image to Cloudinary: name={}, size={}", file.getOriginalFilename(), file.getSize());
                return uploadToCloudinary(file);
            } catch (RuntimeException ex) {
                // Never fail the admin flow when remote upload provider is unavailable.
                log.warn("Cloudinary upload failed, falling back to local storage: {}", ex.getMessage());
            }
        }

        return storeImageLocally(file);
    }

    private String storeImageLocally(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String original = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();
            String extension = getExtension(original);
            String storedName = UUID.randomUUID() + extension;

            Path target = uploadPath.resolve(storedName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            log.info("Stored image locally: path={}", target);
            return "/uploads/" + storedName;
        } catch (IOException ex) {
            throw new UncheckedIOException("Failed to store image", ex);
        }
    }

    private boolean cloudinaryConfigured() {
        return cloudinaryEnabled
                && !cloudinaryCloudName.isBlank()
                && !cloudinaryApiKey.isBlank()
                && !cloudinaryApiSecret.isBlank();
    }

    private String uploadToCloudinary(MultipartFile file) {
        Map<String, Object> options = new HashMap<>();
        options.put("folder", cloudinaryFolder);
        options.put("resource_type", "image");

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().upload(file.getBytes(), options);
            Object secureUrl = result.get("secure_url");
            if (secureUrl == null) {
                throw new RuntimeException("Cloudinary upload did not return a URL");
            }
            log.info("Cloudinary upload success: url={}", secureUrl);
            return secureUrl.toString();
        } catch (IOException ex) {
            throw new UncheckedIOException("Failed to upload image", ex);
        }
    }

    private String getExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        if (lastDot < 0 || lastDot == filename.length() - 1) {
            return ".jpg";
        }
        return filename.substring(lastDot);
    }
}
