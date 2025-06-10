package com.example.onlineexam.controller;

import com.example.onlineexam.entity.Exam;
import com.example.onlineexam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping("/add")
    public ResponseEntity<Exam> addExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.addExam(exam));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Integer id, @RequestBody Exam exam) {
        return ResponseEntity.ok(examService.updateExam(id, exam));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Integer id) {
        examService.deleteExam(id);
        return ResponseEntity.ok().build();
    }

    // Changed to root path, so fetch all exams from /api/exams
    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Integer id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }
}
