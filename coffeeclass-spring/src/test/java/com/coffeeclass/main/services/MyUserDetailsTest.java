package com.coffeeclass.main.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class MyUserDetailsTest {

	@Mock
	private UserRepository mockUserRepository;
	private MyUserDetails testMyUserDetails;

	@BeforeEach
	void setUp() {
		testMyUserDetails = new MyUserDetails(mockUserRepository);
	}
	
	@Test
	void testLoadUserByUsernameIsUser(){
		// given
		User mockUser = mock(User.class);
		String username = "James";
		String password = "password";
		// when
		when(mockUserRepository.findByUsername(username)).thenReturn(mockUser);
		when(mockUser.getPassword()).thenReturn(password);
		UserDetails userDetails = testMyUserDetails.loadUserByUsername(username);
		// then
		boolean result = userDetails.getAuthorities().stream()
				.anyMatch(a -> a.getAuthority().equals("USER"));
		assertThat(result).isEqualTo(true);
	}
	
	@Test
	void testLoadUserByUsernameIsAdmin(){
		// given
		User mockUser = mock(User.class);
		String username = "James";
		String password = "password";
		// when
		when(mockUserRepository.findByUsername(username)).thenReturn(mockUser);
		when(mockUser.getUserType()).thenReturn("ADMIN");
		when(mockUser.getPassword()).thenReturn(password);
		UserDetails userDetails = testMyUserDetails.loadUserByUsername(username);
		// then
		boolean result = userDetails.getAuthorities().stream()
				.anyMatch(a -> a.getAuthority().equals("ADMIN"));
		assertThat(result).isEqualTo(true);
	}

	@Test
	void testLoadUserByUsernameThrow() {
		// given
		String username = "James";
		// when
		when(mockUserRepository.findByUsername(username)).thenReturn(null);
		// given
		assertThatThrownBy(() -> testMyUserDetails.loadUserByUsername(username))
		.isInstanceOf(UsernameNotFoundException.class)
		.hasMessageContaining("User" + username + "not found");
	}

}
