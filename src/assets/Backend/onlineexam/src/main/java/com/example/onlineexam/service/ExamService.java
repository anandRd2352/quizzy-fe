package com.example.onlineexam.service;

import com.example.onlineexam.entity.Exam;
import java.util.List;

public interface ExamService {
    Exam addExam(Exam exam);
    Exam updateExam(Integer id, Exam exam);
    void deleteExam(Integer id);
    List<Exam> getAllExams();
    Exam getExamById(Integer id);
}
