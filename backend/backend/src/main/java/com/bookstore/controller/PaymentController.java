package com.bookstore.controller;

import com.bookstore.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@RequestBody Map<String, Object> request) {
        try {
            Long amount = Long.parseLong(request.get("amount").toString());
            String currency = (String) request.getOrDefault("currency", "usd");
            
            Map<String, Object> response = paymentService.createPaymentIntentResponse(amount, currency);
            
            if (response.containsKey("error")) {
                return ResponseEntity.badRequest().body(response);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = Map.of("error", "Invalid request: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
} 