package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	public UserRepository userRepository;
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
		
	public User loginUser(String email, String password) {
		return userRepository.findByEmailAndPassword(email, password);
	}
}
