package com.coffeeclass.main.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.anyInt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.coffeeclass.main.models.Course;

@DataJpaTest
class CourseRepositoryTest {

	@Autowired
	private CourseRepository testCourseRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	void testFindByIdInt() {
		// given
		Course course = new Course("Testing", "This is a test.", "9 OO AM - 10 OO AM");
		Course testCourse = entityManager.persist(course);
		entityManager.flush();
		
		// when
		Course courseFound = testCourseRepository.findById(testCourse.getCourseId());
		
		// then
		assertThat(courseFound.getCourseId()).isEqualTo(testCourse.getCourseId());
		
	}
	
	@Test
	void testFindByIdIntNotFound() {
		// when
		Course courseFound = testCourseRepository.findById(anyInt());
		
		//then
		assertThat(courseFound).isEqualTo(null);
	}

}
