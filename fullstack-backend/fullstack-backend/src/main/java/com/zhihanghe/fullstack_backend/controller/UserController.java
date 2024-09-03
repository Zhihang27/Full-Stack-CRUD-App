package com.zhihanghe.fullstack_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zhihanghe.fullstack_backend.exception.UserNotFoundException;
import com.zhihanghe.fullstack_backend.model.User;
import com.zhihanghe.fullstack_backend.repository.UserRepository;

import java.util.List;
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/user")
	User newUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
	}
	
	@GetMapping("/users")
	List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	//Finding User
	
	@GetMapping("/user/{id}")
	User getUserById(@PathVariable Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException(id));
	}
	
	//Updaetd User on SQL
	
	@PutMapping("/user/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
	    return userRepository.findById(id)
	            .map(user -> {
	                user.setUsername(newUser.getUsername());
	                user.setName(newUser.getName());
	                user.setEmail(newUser.getEmail());
	                return userRepository.save(user);
	            })
	            .orElseThrow(() -> new UserNotFoundException(id));
	}
	@DeleteMapping("/user/{id}")
	String deleteUser(@PathVariable Long id) {
		if(!userRepository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userRepository.deleteById(id);
		return "User with id "+id+" has been deleted successfully";
	}
	

}
