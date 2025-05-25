package com.onlineexam.app.Online_Examination_App.controller;

import com.onlineexam.app.Online_Examination_App.model.User;
import com.onlineexam.app.Online_Examination_App.repository.UserRepository;
import com.onlineexam.app.Online_Examination_App.service.EmailService;
import com.onlineexam.app.Online_Examination_App.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend access
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        String otp = otpService.generateOtp();
        user.setOtp(otp);
        userRepository.save(user);
        emailService.sendOtp(user.getEmail(), otp);
        return "User registered & OTP sent to email.";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        return userRepository.findByEmail(email)
                .map(user -> {
                    if (user.getOtp().equals(otp)) {
                        return "OTP verified successfully!";
                    } else {
                        return "Invalid OTP.";
                    }
                }).orElse("User not found.");
    }
}
