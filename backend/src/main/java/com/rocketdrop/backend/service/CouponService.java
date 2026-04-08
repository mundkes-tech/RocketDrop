package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.Coupon;
import com.rocketdrop.backend.repository.CouponRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CouponService {
    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> getActiveCoupons() {
        return couponRepository.findByActiveTrueOrderByCodeAsc();
    }

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Map<String, Object> validateCoupon(String code, Double subtotal) {
        Coupon coupon = couponRepository.findByCodeIgnoreCase(code == null ? "" : code.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid coupon code"));

        if (!isCouponUsable(coupon)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Coupon is inactive or expired");
        }

        int discount = coupon.getDiscountPercentage() == null ? 0 : coupon.getDiscountPercentage();
        double safeSubtotal = subtotal == null ? 0 : subtotal;
        double discountAmount = Math.round((safeSubtotal * discount / 100.0) * 100.0) / 100.0;

        return Map.of(
                "code", coupon.getCode(),
                "discountPercentage", discount,
                "discountAmount", discountAmount,
                "valid", true
        );
    }

    @Transactional
    public Coupon createCoupon(String code, Integer discountPercentage, Boolean active, LocalDateTime validFrom, LocalDateTime validTo) {
        if (code == null || code.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Coupon code is required");
        }
        if (discountPercentage == null || discountPercentage <= 0 || discountPercentage > 80) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Discount percentage must be between 1 and 80");
        }

        couponRepository.findByCodeIgnoreCase(code.trim()).ifPresent(existing -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Coupon code already exists");
        });

        Coupon coupon = new Coupon();
        coupon.setCode(code.trim().toUpperCase());
        coupon.setDiscountPercentage(discountPercentage);
        coupon.setActive(active == null ? true : active);
        coupon.setValidFrom(validFrom);
        coupon.setValidTo(validTo);
        return couponRepository.save(coupon);
    }

    @Transactional
    public Coupon updateCoupon(Long couponId, Integer discountPercentage, Boolean active, LocalDateTime validFrom, LocalDateTime validTo) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Coupon not found"));

        if (discountPercentage != null) {
            if (discountPercentage <= 0 || discountPercentage > 80) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Discount percentage must be between 1 and 80");
            }
            coupon.setDiscountPercentage(discountPercentage);
        }

        if (active != null) {
            coupon.setActive(active);
        }

        if (validFrom != null || validTo != null) {
            coupon.setValidFrom(validFrom);
            coupon.setValidTo(validTo);
        }

        return couponRepository.save(coupon);
    }

    @Transactional
    public void deleteCoupon(Long couponId) {
        if (!couponRepository.existsById(couponId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Coupon not found");
        }
        couponRepository.deleteById(couponId);
    }

    public Coupon getUsableCouponOrThrow(String code) {
        Coupon coupon = couponRepository.findByCodeIgnoreCase(code == null ? "" : code.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid coupon code"));

        if (!isCouponUsable(coupon)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Coupon is inactive or expired");
        }

        return coupon;
    }

    @Transactional
    public void markCouponUsed(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Coupon not found"));
        coupon.setUsageCount((coupon.getUsageCount() == null ? 0 : coupon.getUsageCount()) + 1);
        couponRepository.save(coupon);
    }

    private boolean isCouponUsable(Coupon coupon) {
        if (coupon == null || !Boolean.TRUE.equals(coupon.getActive())) {
            return false;
        }

        LocalDateTime now = LocalDateTime.now();
        if (coupon.getValidFrom() != null && now.isBefore(coupon.getValidFrom())) {
            return false;
        }
        if (coupon.getValidTo() != null && now.isAfter(coupon.getValidTo())) {
            return false;
        }

        return true;
    }
}
