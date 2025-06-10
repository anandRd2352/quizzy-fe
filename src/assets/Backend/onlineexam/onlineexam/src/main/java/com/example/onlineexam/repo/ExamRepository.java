package com.example.onlineexam.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.onlineexam.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam,Integer>{

}
