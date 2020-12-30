package com.coffeeclass.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public String createNewUser(User user) {
		try {
			userRepository.save(user);
			return "success";
		}catch(Exception e) {
			return null;
		}
	}
}
