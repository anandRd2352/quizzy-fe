package com.onlineexam.app.Online_Examination_App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.app.Online_Examination_App.model.User;
import com.onlineexam.app.Online_Examination_App.service.EmailService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private EmailService emailService;

    // ✅ EXISTING: Send OTP API
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        String otp = generateOtp();
        emailService.sendOtp(email, otp);
        return ResponseEntity.ok("OTP sent to email");
    }

    // ✅ NEW: Register User API
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // You can later call a UserService to save user
        return ResponseEntity.ok("User registered: " + user.getName());
    }

    private String generateOtp() {
        int otp = 100000 + new java.util.Random().nextInt(900000); // 6-digit
        return String.valueOf(otp);
    }
}
