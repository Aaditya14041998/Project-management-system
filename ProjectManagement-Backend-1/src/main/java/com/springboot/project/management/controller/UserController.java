package com.springboot.project.management.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.springboot.project.management.model.User;
import com.springboot.project.management.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	// create user rest api
	@PostMapping("/user")
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	// create login authentification
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
		String emailId = credentials.get("emailId");
		String password = credentials.get("password");

		User user = userRepository.findByEmailAndPassword(emailId, password);
		System.out.println(user);
		if (user == null) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Invalid credentials");
			errorResponse.put("message", "The username or password you provided is incorrect. Please try again.");

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);

		}
		user.setPassword(null);
		Map<String, String> successResponse = new HashMap<>();
		successResponse.put("success", "true");
		successResponse.put("message", "Valid user");

		return ResponseEntity.status(HttpStatus.OK).body(successResponse);

	}

}
