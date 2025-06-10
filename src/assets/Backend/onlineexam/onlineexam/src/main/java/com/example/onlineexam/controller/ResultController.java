package com.example.onlineexam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.onlineexam.entity.Result;
import com.example.onlineexam.service.EmailService;
import com.example.onlineexam.service.ResultService;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Result> saveResult(@RequestBody Result result) {
        System.out.println("Saving result: " + result.getEmail() + ", Score: " + result.getScore());
        Result saved = resultService.saveResult(result);
        System.out.println("Saved with ID: " + saved.getId());

        // ✅ Send Result Email
        try {
            emailService.sendResultEmail(result.getEmail(), result.getExamTitle(), result.getScore());
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Result>> getResultsByEmail(@PathVariable String email) {
        return ResponseEntity.ok(resultService.findByEmail(email));
    }
}
