package com.anand.project.crud_app.service;



import com.anand.project.crud_app.model.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    List<Question> getAllQuestions();
    Optional<Question> getQuestionById(Long id);
    Question createQuestion(Question question);
    Optional<Question> updateQuestion(Long id, Question question);
    void deleteQuestion(Long id);
    List<Question> getQuestionsByExamId(Long examId);
}
