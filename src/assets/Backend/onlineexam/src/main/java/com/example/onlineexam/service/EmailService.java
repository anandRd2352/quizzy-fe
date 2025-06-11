package com.example.onlineexam.service;

public interface EmailService {
    void sendResultEmail(String to, String examTitle, int score);
}
