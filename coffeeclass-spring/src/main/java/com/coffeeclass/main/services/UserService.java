package com.coffeeclass.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	UserRepository userRepository;
	
//	public String createNewUser(User user) {
//		try {
////			String password = user.getPassword();
//			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//			userRepository.save(user);
//			return "success";
//		}catch(Exception e) {
//			return null;
//		}
//	}
	
	public String createNewUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return String.valueOf(userRepository.save(new User(user)).getUserid());
	}
	
}
