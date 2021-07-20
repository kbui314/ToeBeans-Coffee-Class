package com.coffeeclass.main.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.coffeeclass.main.models.ContactForm;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.ContactRepository;
import com.coffeeclass.main.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	@Mock
	private UserRepository userRepository;
	@Mock
	private ContactRepository contactRepository;
	@Mock
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Captor
	ArgumentCaptor<User> userCaptor;
	
	@Captor
	ArgumentCaptor<ContactForm> contactFormCaptor;

	private UserService testUserService;

	@BeforeEach
	void setUp() {
		testUserService = new UserService(userRepository, contactRepository, bCryptPasswordEncoder);
	}

	@Test
	void testCreateNewUser() {
		// given
		User user = new User("James", "Coll", "jcoll2@gmail.com", "password", "2342342344", "USER");

		// when
		testUserService.createNewUser(user);

		// then
		verify(userRepository).save(userCaptor.capture());
		User capturedUser = userCaptor.getValue();
		assertThat(capturedUser).isEqualTo(user);
	}

	@Test
	void testCreateNewUserSuccess() {
		// given
		User user = new User("James", "Coll", "jcoll2@gmail.com", "password", "2342342344", "USER");

		// when
		String expected = testUserService.createNewUser(user);

		// then
		assertThat(expected).isEqualTo("success");
	}

	@Test
	void testCreateNewUserFailed() {
		// given
		User user = null;

		// when
		String expected = testUserService.createNewUser(user);

		// then
		assertThat(expected).isEqualTo("failed");
	}

	@Test
	void testGetUser() {
		// when
		User user = testUserService.getUser(anyString());
		// then
		verify(userRepository).findByUsername(anyString());
	}

	@Test
	void testGetUserThrow() {
		// when
		when(userRepository.findByUsername(anyString())).thenThrow(new RuntimeException("Error occured"));
		User user = testUserService.getUser(anyString());

		// then
		boolean result = user.equals(new User());
		assertThat(result).isEqualTo(true);
	}

	@Test
	void testGetAllUser() {
		// when
		testUserService.getAllUser();

		// then
		verify(userRepository).findAll();
	}

	@Test
	void testGetAllUserThrow() {
		// when
		when(userRepository.findAll()).thenThrow(new RuntimeException("Error occured"));
		List<User> results = testUserService.getAllUser();

		// then
		assertEquals(results, new ArrayList<User>());
	}

	@Test
	void testSaveUser() {
		// given
		User user = new User("James", "Coll", "jcoll2@gmail.com", "password", "2342342344", "USER");
		// when
		testUserService.saveUser(user);
		// then
		verify(userRepository).save(userCaptor.capture());
		User capturedUser = userCaptor.getValue();
		assertThat(capturedUser).isEqualTo(user);
	}

	@Test
	void testCreateContactForm() {
		// given
		ContactForm contactForm = new ContactForm("James", "Coll", "jcoll2@gmail.com", "This is a test");
		// when
		testUserService.createContactForm(contactForm);
		// then
		verify(contactRepository).save(contactFormCaptor.capture());
		ContactForm capturedContactForm = contactFormCaptor.getValue();
		assertThat(capturedContactForm).isEqualTo(contactForm);

	}

	@Test
	void testCreateContactFormThrow() {
		// when
		when(contactRepository.save(any())).thenThrow(new RuntimeException("Error occured"));
		ContactForm contactForm = testUserService.createContactForm(any());
		// then
		boolean result = contactForm.equals(new ContactForm("", "", "", ""));
		assertThat(result).isEqualTo(true);
	}

	@Test
	void testVerifyUserIsAdmin() {
		// when
		when(userRepository.findByUsername(anyString())).thenReturn(new User("Jame", "Coll", "jcoll2@gmail.com","password", "2342342344","ADMIN"));
		Map<String, String> resultMap = testUserService.verifyUser(anyString());
		
		// then
		HashMap<String, String> expected = new HashMap<>();
		expected.put("message", "Success");
		boolean result = resultMap.equals(expected);
		assertThat(result).isEqualTo(true);

	}

	@Test
	void testVerifyUserIsNotAdmin() {
		// when
		when(userRepository.findByUsername(anyString())).thenReturn(new User("Jame", "Coll", "jcoll2@gmail.com","password", "2342342344","NORMAL"));
		Map<String, String> resultMap = testUserService.verifyUser(anyString());
		
		// then
		HashMap<String, String> expected = new HashMap<>();
		expected.put("message", "Failed");
		boolean result = resultMap.equals(expected);
		assertThat(result).isEqualTo(true);

	}

	@Test
	void testVerifyUserThrow() {
		// when
		when(userRepository.findByUsername(anyString())).thenThrow(new RuntimeException("Error occured"));
		Map<String, String> resultMap = testUserService.verifyUser(anyString());

		// then
		HashMap<String, String> expected = new HashMap<>();
		expected.put("message", "Failed");
		boolean result = resultMap.equals(expected);
		assertThat(result).isEqualTo(true);
	}

}
