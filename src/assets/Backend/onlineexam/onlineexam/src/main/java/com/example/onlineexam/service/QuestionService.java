package com.example.onlineexam.service;

import com.example.onlineexam.entity.Question;
import java.util.List;

public interface QuestionService {
    Question addQuestion(Integer examId, Question question);
    Question updateQuestion(Integer id, Question question);
    Question getQuestionById(Integer id);
    void deleteQuestion(Integer id);
    List<Question> getQuestionsByExamId(Integer examId);
}
