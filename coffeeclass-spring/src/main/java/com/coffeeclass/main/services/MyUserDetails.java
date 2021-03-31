package com.coffeeclass.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.UserRepository;

@Service
public class MyUserDetails implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		final User user = userRepository.findByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("User" + username + "not found");
		}
		
		if(user.getUserType() == "ADMIN") {
			return org.springframework.security.core.userdetails.User
					.withUsername(username)
					.password(user.getPassword())
					.authorities("ADMIN")
					.accountExpired(false)
					.accountLocked(false)
					.credentialsExpired(false)
					.disabled(false)
					.build();
		}
		
		return org.springframework.security.core.userdetails.User
		        .withUsername(username)
		        .password(user.getPassword())
		        .authorities("USER")
		        .accountExpired(false)
		        .accountLocked(false)
		        .credentialsExpired(false)
		        .disabled(false)
		        .build();
	}

}
