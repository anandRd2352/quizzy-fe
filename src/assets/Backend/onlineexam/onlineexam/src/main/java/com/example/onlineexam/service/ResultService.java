package com.example.onlineexam.service;

import java.util.List;

import com.example.onlineexam.entity.Result;

public interface ResultService {
    Result saveResult(Result result);
    List<Result> findByEmail(String email);
}