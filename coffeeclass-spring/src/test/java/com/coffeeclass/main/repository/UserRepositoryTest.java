package com.coffeeclass.main.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.coffeeclass.main.models.User;

@DataJpaTest
class UserRepositoryTest {
	
	@Autowired
	private UserRepository userRepositoryTest;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@AfterEach
	void tearDown() {
		userRepositoryTest.deleteAll();
		entityManager.clear();
	}

	@Test
	void testFindByUsername() {
		// given
		User user = new User("James", "Coll","jcoll2@gmail.com", "password", "2342342344", "USER");
		entityManager.persist(user);
		entityManager.flush();
		
		// when
		User userFound = userRepositoryTest.findByUsername(user.getUsername());
		
		// then
		assertThat(userFound.getUsername()).isEqualTo("jcoll2@gmail.com");
		
	}
	
	@Test
	void testFindByUsernameDoesNotExist() {
		// when
		User userFound = userRepositoryTest.findByUsername(anyString());
		
		// then
		assertThat(userFound).isEqualTo(null);
	}

}
