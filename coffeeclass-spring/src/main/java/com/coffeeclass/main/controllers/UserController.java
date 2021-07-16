package com.coffeeclass.main.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coffeeclass.main.models.ContactForm;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.services.UserService;

@RestController
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/signup")
	public String createNewUser(@RequestBody User user) {
		return userService.createNewUser(user);
	}
	
	@PostMapping("/logout")
	public String logout(HttpServletRequest request) {
		return null;
	}
	
	@PostMapping("/sendform")
	public ContactForm sendForm(@RequestBody ContactForm contactForm) {
		return userService.createContactForm(contactForm);
	}
	
	@GetMapping("/verify")
	public Map<String, String> verify(Authentication auth) {
		return userService.verifyUser(auth.getName());
	}
}
