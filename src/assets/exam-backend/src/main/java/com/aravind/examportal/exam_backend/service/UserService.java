package com.aravind.examportal.exam_backend.service;

import com.aravind.examportal.exam_backend.user.*;
import com.aravind.examportal.exam_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public Optional<User> getUserProfile(Long id) {
        return userRepository.findById(id);
    }

    public User updateProfile(Long id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setProfilePicture(updatedUser.getProfilePicture());
            user.setStatus(updatedUser.getStatus());
            return userRepository.save(user);
        }
        return null;
    }
}