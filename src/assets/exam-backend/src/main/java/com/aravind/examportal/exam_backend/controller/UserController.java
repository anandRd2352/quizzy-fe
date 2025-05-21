package com.aravind.examportal.exam_backend.controller;

import com.aravind.examportal.exam_backend.user.*;
import com.aravind.examportal.exam_backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // BE-1.1.5: Login
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userService.login(user.getEmail(), user.getPassword());
        if (existingUser != null) {
            return "Login successful for user: " + existingUser.getEmail();
        } else {
            return "Invalid credentials";
        }
    }

    // BE-1.2.3: Get user profile
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserProfile(id).orElse(null);
    }

    // BE-1.2.4: Profile update with validation
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User user) {
        if (user.getEmail() == null || user.getName() == null) {
            return "Validation failed: Name and email required";
        }
        User updated = userService.updateProfile(id, user);
        return (updated != null) ? "Profile updated" : "User not found";
    }
}