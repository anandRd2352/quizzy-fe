package com.aravind.examportal.exam_backend.repository;

import com.aravind.examportal.exam_backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}