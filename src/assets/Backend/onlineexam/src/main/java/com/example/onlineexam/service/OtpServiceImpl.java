package com.example.onlineexam.service;

import com.example.onlineexam.entity.User;
import com.example.onlineexam.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService {

    private final Map<String, String> otpStore = new HashMap<>();

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository; // ✅ Inject UserRepository

    @Override
    public void generateAndSendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("OTP Verification");
        message.setText("Your OTP for verification is: " + otp);
        mailSender.send(message);
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        if (otp.equals(otpStore.get(email))) {
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setOtpVerified(true); // ✅ Mark OTP as verified in DB
                userRepository.save(user); // ✅ Save updated user
                return true;
            }
        }
        return false;
    }

    @Override
    public void clearOtp(String email) {
        otpStore.remove(email);
    }
}
