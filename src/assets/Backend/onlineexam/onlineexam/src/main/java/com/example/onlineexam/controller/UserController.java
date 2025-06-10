package com.example.onlineexam.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlineexam.dto.LoginDto;
import com.example.onlineexam.entity.User;
import com.example.onlineexam.service.UserService;
import com.example.onlineexam.service.UserServiceImpl;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserServiceImpl userService;
		
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user){
		
		return new ResponseEntity<>(userService.registerUser(user),HttpStatus.OK);
			
	}
	
	 // Changed to accept only LoginDto and return user role in response
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto login) {
        User user = userService.userLogin(login);
        // Return email and role as JSON to frontend
        return ResponseEntity.ok(Map.of(
            "email", user.getEmail(),
            "role", user.getRole()
        ));
    }
}