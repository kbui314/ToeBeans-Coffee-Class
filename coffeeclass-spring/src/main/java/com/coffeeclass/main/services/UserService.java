package com.coffeeclass.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.ContactForm;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.ContactRepository;
import com.coffeeclass.main.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ContactRepository contactRepository;
	
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
	
	public User getUser(String username) {
		try {
			return userRepository.findByUsername(username);
		}catch(Exception e) {
			return new User();
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
			return new ContactForm(0,"","","","");
		}
	}
	
}
