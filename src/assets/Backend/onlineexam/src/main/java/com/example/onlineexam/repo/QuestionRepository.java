package com.example.onlineexam.repo;

import com.example.onlineexam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    
	List<Question> findByExamId(Integer examId);

}
