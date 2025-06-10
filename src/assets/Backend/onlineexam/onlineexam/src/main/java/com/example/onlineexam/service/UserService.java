package com.example.onlineexam.service;

import java.util.Optional;

import com.example.onlineexam.dto.LoginDto;
import com.example.onlineexam.entity.User;

public interface UserService {
	
	User registerUser(User user);
	 User userLogin(LoginDto login);

}
