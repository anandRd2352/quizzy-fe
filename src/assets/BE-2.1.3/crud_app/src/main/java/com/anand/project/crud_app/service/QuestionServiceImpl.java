package com.anand.project.crud_app.service;



import com.anand.project.crud_app.model.Question;
import com.anand.project.crud_app.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Optional<Question> updateQuestion(Long id, Question updated) {
        return questionRepository.findById(id).map(question -> {
            question.setQuestionText(updated.getQuestionText());
            question.setOptionA(updated.getOptionA());
            question.setOptionB(updated.getOptionB());
            question.setOptionC(updated.getOptionC());
            question.setOptionD(updated.getOptionD());
            question.setCorrectAnswer(updated.getCorrectAnswer());
            question.setExam(updated.getExam());
            return questionRepository.save(question);
        });
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public List<Question> getQuestionsByExamId(Long examId) {
        return questionRepository.findByExamId(examId);
    }
}
