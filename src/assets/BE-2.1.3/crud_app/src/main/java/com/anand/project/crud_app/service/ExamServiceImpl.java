package com.anand.project.crud_app.service;

import com.anand.project.crud_app.model.Exam;
import com.anand.project.crud_app.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @Override
    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public Optional<Exam> updateExam(Long id, Exam updatedExam) {
        return examRepository.findById(id).map(exam -> {
            exam.setTitle(updatedExam.getTitle());
            exam.setDescription(updatedExam.getDescription());
            exam.setDuration(updatedExam.getDuration());
            return examRepository.save(exam);
        });
    }

    @Override
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}
