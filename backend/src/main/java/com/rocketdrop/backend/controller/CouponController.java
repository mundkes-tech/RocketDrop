package com.rocketdrop.backend.controller;

import com.rocketdrop.backend.model.Coupon;
import com.rocketdrop.backend.service.CouponService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {
    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @GetMapping
    public ResponseEntity<List<Coupon>> getActiveCoupons() {
        return ResponseEntity.ok(couponService.getActiveCoupons());
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateCoupon(@RequestParam String code,
                                                              @RequestParam(required = false) Double subtotal) {
        return ResponseEntity.ok(couponService.validateCoupon(code, subtotal));
    }
}
