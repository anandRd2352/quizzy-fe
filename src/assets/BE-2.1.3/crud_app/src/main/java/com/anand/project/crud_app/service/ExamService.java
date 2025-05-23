package com.anand.project.crud_app.service;

import com.anand.project.crud_app.model.Exam;

import java.util.List;
import java.util.Optional;

public interface ExamService {

    List<Exam> getAllExams();

    Optional<Exam> getExamById(Long id);

    Exam createExam(Exam exam);

    Optional<Exam> updateExam(Long id, Exam updatedExam);

    void deleteExam(Long id);
}
