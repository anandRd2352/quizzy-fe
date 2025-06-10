package com.example.onlineexam.service;

import com.example.onlineexam.entity.Exam;
import com.example.onlineexam.repo.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Override
    public Exam addExam(Exam exam) {
        return examRepository.save(exam);
    }
    
    @Override
    public Exam updateExam(Integer id, Exam updatedExam) {
        Optional<Exam> optionalExam = examRepository.findById(id);
        if (optionalExam.isPresent()) {
            Exam existingExam = optionalExam.get();
            existingExam.setTitle(updatedExam.getTitle());
            existingExam.setDescription(updatedExam.getDescription());
            return examRepository.save(existingExam);
        } else {
            throw new RuntimeException("Exam not found with id: " + id);
        }
    }

    @Override
    public void deleteExam(Integer id) {
        examRepository.deleteById(id);
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @Override
    public Exam getExamById(Integer id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found with id: " + id));
    }
}
