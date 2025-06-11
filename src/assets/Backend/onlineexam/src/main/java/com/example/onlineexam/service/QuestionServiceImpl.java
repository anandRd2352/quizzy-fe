package com.example.onlineexam.service;

import com.example.onlineexam.entity.Exam;
import com.example.onlineexam.entity.Question;
import com.example.onlineexam.repo.ExamRepository;
import com.example.onlineexam.repo.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    @Override
    public Question addQuestion(Integer examId, Question question) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found with id: " + examId));
        question.setExam(exam);
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Integer id, Question updatedQuestion) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        existingQuestion.setQuestionText(updatedQuestion.getQuestionText());
        existingQuestion.setOptionA(updatedQuestion.getOptionA());
        existingQuestion.setOptionB(updatedQuestion.getOptionB());
        existingQuestion.setOptionC(updatedQuestion.getOptionC());
        existingQuestion.setOptionD(updatedQuestion.getOptionD());
        existingQuestion.setCorrectAnswer(updatedQuestion.getCorrectAnswer());

        return questionRepository.save(existingQuestion);
    }

    @Override
    public void deleteQuestion(Integer id) {
        questionRepository.deleteById(id);
    }

    @Override
    public List<Question> getQuestionsByExamId(Integer examId) {
        return questionRepository.findByExamId(examId);
    }
    
    @Override
    public Question getQuestionById(Integer id) {
        return questionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

}
