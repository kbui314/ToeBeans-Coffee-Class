package com.coffeeclass.main.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.ContactForm;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.ContactRepository;
import com.coffeeclass.main.repository.UserRepository;

@Service
public class UserService {
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final UserRepository userRepository;
	private final ContactRepository contactRepository;
	
	@Autowired
	public UserService(UserRepository userRepository, ContactRepository contactRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userRepository = userRepository;
		this.contactRepository = contactRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	public String createNewUser(User user) {
		try {
			user.setUserType("NORMAL");
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
	//		return String.valueOf(userRepository.save(new User(user)).getUserid());
			userRepository.save(user);
			return "success";
		}catch(Exception e) {
			return "failed";
		}
	}
	
	public User getUser(String username) {
		try {
			return userRepository.findByUsername(username);
		}catch(Exception e) {
			return new User();
		}
	}
	
	public List<User> getAllUser(){
		try {
			return userRepository.findAll();
		}catch(Exception e) {
			return new ArrayList<User>();
		}
	}
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public ContactForm createContactForm(ContactForm contactForm) {
		try {
			contactRepository.save(contactForm);
			return contactForm;
		}catch(Exception e) {
			return new ContactForm("","","","");
		}
	}
	
	public Map<String, String> verifyUser(String username) {
		HashMap<String, String> map = new HashMap<>();
		try {
			User user = getUser(username);
			if (user.getUserType().equals("ADMIN")) {
				map.put("message","Success");
				return map;
			}
			map.put("message", "Failed");
			return map;
		}catch(Exception e) {
			map.put("message", "Failed");
			return map;
		}
	}
}
