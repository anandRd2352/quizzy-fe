package com.example.onlineexam.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.onlineexam.dto.LoginDto;
import com.example.onlineexam.entity.User;
import com.example.onlineexam.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {
    	 if (user.getPassword().length() < 8) {
    	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
    	    }
    	 
    	 User existingUser = userRepository.findByEmail(user.getEmail());
    	 if (existingUser != null) {
    		    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already registered");
    		}
    	 
        return userRepository.save(user);
    }

    @Override
    public User userLogin(LoginDto login) {

        User existingUser = userRepository.findByEmail(login.getEmail());
        
        if (existingUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Login unsuccessful: User not found");
        }
        if (!existingUser.getPassword().equals(login.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Login unsuccessful: Incorrect password");
        }
        return existingUser; // Return user object to get role
    }
}
