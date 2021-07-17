package com.coffeeclass.main.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.coffeeclass.main.models.ContactForm;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.services.MyUserDetails;
import com.coffeeclass.main.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

@AutoConfigureMockMvc
@WebMvcTest(controllers = UserController.class)
class UserControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private MyUserDetails myUserDetails;
	@MockBean
	private UserService mockUserService;

	@InjectMocks
	private UserController testUserController;

	@Test
	void testCreateNewUser() throws Exception {
		String url = "/signup";
		User user = new User("James", "Coll", "jcoll2@gmail.com", "password", "2342342344", "USER");
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter writer = mapper.writer().withDefaultPrettyPrinter();
		String requestJson = writer.writeValueAsString(user);

		mockMvc.perform(post(url).contentType("application/json")
				.content(requestJson)).andExpect(status().isOk());
	};

	@Test
	void testLogout() throws Exception {
		String url = "/logout";

		MvcResult result = mockMvc.perform(post(url)
				.contentType("application/json")).andReturn();
		assertThat(result.getResponse().getContentAsString()).isEqualTo("");
	}

	@Test
	void testSendForm() throws Exception {
		String url = "/sendform";
		
		ContactForm contactForm = new ContactForm("James", "Coll", "jcoll2@gmail.com", "This is a test");
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter writer = mapper.writer().withDefaultPrettyPrinter();
		String requestJson = writer.writeValueAsString(contactForm);

		mockMvc.perform(post(url).contentType("application/json")
				.content(requestJson)).andExpect(status().isOk());
	}

	@Test
	void testVerify() throws Exception {
		String url = "/verify";

		MvcResult result = mockMvc.perform(post(url)
				.contentType("application/json")).andReturn();
		assertThat(result.getResponse().getContentAsString()).isEqualTo("");
	}

}
