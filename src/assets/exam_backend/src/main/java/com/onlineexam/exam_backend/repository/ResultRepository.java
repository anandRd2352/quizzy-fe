package com.onlineexam.exam_backend.repository;



import com.onlineexam.exam_backend.model.Result;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}

