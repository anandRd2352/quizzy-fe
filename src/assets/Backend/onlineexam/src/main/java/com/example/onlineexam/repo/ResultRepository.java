package com.example.onlineexam.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.onlineexam.entity.Result;

public interface ResultRepository extends JpaRepository<Result, Long> {
	List<Result> findByEmail(String email);

}
