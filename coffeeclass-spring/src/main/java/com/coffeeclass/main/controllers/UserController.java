package com.coffeeclass.main.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coffeeclass.main.models.User;
import com.coffeeclass.main.services.UserService;

//@CrossOrigin(origins = {"http://localhost:3000/"})
@RestController
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/signup")
	public String createNewUser(@RequestBody User user) {
		return userService.createNewUser(user);
	}
	
	@PostMapping("/logout")
	public String logout(HttpServletRequest request) {
		return null;
	}
	
//	@PostMapping("/users")
//	public ResponseEntity<Void> createNewUser(@RequestBody User user){
//		User newUser = userService.createNewUser(user);
//		URI rui = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newUser.getUserid()).toUri();
//		return ResponseEntity.created(uri).build();
//	}
}
