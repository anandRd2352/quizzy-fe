package com.example.onlineexam.controller;

import com.example.onlineexam.entity.Question;
import com.example.onlineexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Add question to a specific exam
    @PostMapping("/add/{examId}")
    public ResponseEntity<Question> addQuestion(
            @PathVariable Integer examId,
            @RequestBody Question question) {
        return ResponseEntity.ok(questionService.addQuestion(examId, question));
    }
    
    //Get Question with ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer id) {
        Question question = questionService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    // Update question by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Integer id,
            @RequestBody Question question) {
        return ResponseEntity.ok(questionService.updateQuestion(id, question));
    }

    // Delete question by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }

    // Get all questions for a specific exam
    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Question>> getQuestionsByExam(@PathVariable Integer examId) {
        return ResponseEntity.ok(questionService.getQuestionsByExamId(examId));
    }
}
