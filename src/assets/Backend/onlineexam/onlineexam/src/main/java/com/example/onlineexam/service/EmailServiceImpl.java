package com.example.onlineexam.service;


import com.example.onlineexam.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendResultEmail(String to, String examTitle, int score) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Exam Result: " + examTitle);
        message.setText("Dear Student,\n\nYou have completed the exam '" + examTitle +
                "'. Your score is: " + score + " out of 10.\n\nThank you for using our Online Exam System.");

        mailSender.send(message);
        System.out.println("✅ Email sent to " + to);
    }
}
