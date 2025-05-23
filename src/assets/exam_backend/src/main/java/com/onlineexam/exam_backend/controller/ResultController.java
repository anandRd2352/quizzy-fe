package com.onlineexam.exam_backend.controller;



import com.onlineexam.exam_backend.model.Result;
import com.onlineexam.exam_backend.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/submit")
    public ResponseEntity<Result> submitAnswers(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long examId = Long.valueOf(payload.get("examId").toString());
        Map<String, String> submittedAnswers = (Map<String, String>) payload.get("submittedAnswers");
        Map<String, String> correctAnswers = (Map<String, String>) payload.get("correctAnswers");

        // Convert keys to Long
        Map<Long, String> submitted = submittedAnswers.entrySet().stream()
                .collect(java.util.stream.Collectors.toMap(e -> Long.valueOf(e.getKey()), Map.Entry::getValue));
        Map<Long, String> correct = correctAnswers.entrySet().stream()
                .collect(java.util.stream.Collectors.toMap(e -> Long.valueOf(e.getKey()), Map.Entry::getValue));

        int score = resultService.calculateScore(submitted, correct);
        Result savedResult = resultService.saveResult(userId, examId, score);
        return ResponseEntity.ok(savedResult);
    }
}
