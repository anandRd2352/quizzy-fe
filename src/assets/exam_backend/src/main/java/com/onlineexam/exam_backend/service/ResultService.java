package com.onlineexam.exam_backend.service;



import com.onlineexam.exam_backend.model.Result;
import com.onlineexam.exam_backend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public int calculateScore(Map<Long, String> submittedAnswers, Map<Long, String> correctAnswers) {
        int score = 0;
        for (Map.Entry<Long, String> entry : submittedAnswers.entrySet()) {
            Long questionId = entry.getKey();
            String submitted = entry.getValue();
            String correct = correctAnswers.get(questionId);
            if (correct != null && correct.equalsIgnoreCase(submitted)) {
                score++;
            }
        }
        return score;
    }

    public Result saveResult(Long userId, Long examId, int score) {
        Result result = new Result();
        result.setUserId(userId);
        result.setExamId(examId);
        result.setScore(score);
        return resultRepository.save(result);
    }
}
