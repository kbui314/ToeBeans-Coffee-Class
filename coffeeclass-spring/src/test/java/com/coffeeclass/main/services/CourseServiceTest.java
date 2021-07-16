package com.coffeeclass.main.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.coffeeclass.main.models.Course;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.CourseRepository;
import com.coffeeclass.main.repository.RegistrationRepository;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

	@Mock
	private CourseRepository mockCourseRepository;
	@Mock
	private RegistrationRepository mockRegistrationRepository;
	@Mock
	private UserService mockUserService;
	private CourseService testCourseService;

	@BeforeEach
	void setUp() {
		testCourseService = new CourseService(mockCourseRepository, mockRegistrationRepository, mockUserService);
	}

	@Test
	void testGetCourseList() {
		// when
		List<Course> result = testCourseService.getCourseList();
		// then
		verify(mockCourseRepository).findAll();
	}
	
	@Test
	void testGetCourseListThrow() {
		// when
		when(mockCourseRepository.findAll()).thenThrow(new RuntimeException("Error occured"));
		List<Course> result = testCourseService.getCourseList();
		// then
		assertThat(result).isEqualTo(null);
	}

	@Test
	void testGetCourse() {
		// when
		Course course = testCourseService.getCourse(anyInt());
		// then
		verify(mockCourseRepository).findById(anyInt());
	}

	@Test
	void testGetCourseThrow() {
		// when
		when(mockCourseRepository.findById(anyInt())).thenThrow(new RuntimeException("Error occured"));
		Course course = testCourseService.getCourse(anyInt());
		// then
		assertThat(course).isEqualTo(null);

	}

	@Test
	void testAddCourse() {
		// given
		Course course = new Course("Test Title","This is a test","12 00 PM - 1 00 PM");
		// when
		Course result = testCourseService.addCourse(course);
		// then
		assertThat(result).isEqualTo(course);
	}

	@Test
	void testAddCourseThrow() {
		// given
		Course course = new Course("Test Title","This is a test","12 00 PM - 1 00 PM");
		// when
		when(mockCourseRepository.save(course)).thenThrow(new RuntimeException("Error occured"));
		Course result = testCourseService.addCourse(course);
		// then
		boolean isEqual = result.equals(new Course());
		assertThat(isEqual).isEqualTo(true);
	}

	@Test
	void testRegistrationCourseFound() {
		// given
		User mockUser = mock(User.class);
		Course mockCourse = mock(Course.class);
		Set<Course> courseList = new HashSet<Course>();
		courseList.add(mockCourse);

		// when
		when(mockUserService.getUser(anyString())).thenReturn(mockUser);
		when(testCourseService.getCourse(anyInt())).thenReturn(mockCourse);
		when(mockUser.getCourses()).thenReturn(courseList);
		String result = testCourseService.registration(1, "James");
		
		// then
		assertThat(result).isEqualTo("registered");
	}

	@Test
	void testRegistrationCourseNotFound() {
		// given
		User mockUser = mock(User.class);
		Course mockCourse = mock(Course.class);
		Set<Course> courseList = new HashSet<Course>();

		// when
		when(mockUserService.getUser(anyString())).thenReturn(mockUser);
		when(testCourseService.getCourse(anyInt())).thenReturn(mockCourse);
		when(mockUser.getCourses()).thenReturn(courseList);
		String result = testCourseService.registration(1, "James");
		
		// then
		assertThat(result).isEqualTo("success");	
	}
	@Test
	void testRegistrationThrow() {
		String result = testCourseService.registration(anyInt(), anyString());
		
		assertThat(result).isEqualTo("failed");
	}
	
	@Test
	void testDeleteUserCourseFound() {
		// given 
		User mockUser = mock(User.class);
		Course mockCourse = mock(Course.class);
		Set<Course> courseList = new HashSet<Course>();
		courseList.add(mockCourse);
		// when
		when(mockUserService.getUser(anyString())).thenReturn(mockUser);
		when(testCourseService.getCourse(anyInt())).thenReturn(mockCourse);
		when(mockUser.getCourses()).thenReturn(courseList);
		String result = testCourseService.deleteUserCourse(1, "James");
		// then
		assertThat(result).isEqualTo("Success");
	}

	@Test
	void testDeleteUserCourseNotFound() {
		// given
		User mockUser = mock(User.class);
		Course mockCourse = mock(Course.class);

		// when
		when(mockUserService.getUser(anyString())).thenReturn(mockUser);
		when(testCourseService.getCourse(anyInt())).thenReturn(mockCourse);
		when(mockUser.getCourses()).thenReturn(new HashSet<Course>());
		String result = testCourseService.deleteUserCourse(1, "James");
		// then
		assertThat(result).isEqualTo("Course not found.");
	}
	
	
	@Test
	void testDeleteUserCourseThrow() {
		// when
		String result = testCourseService.deleteUserCourse(anyInt(), anyString());
		
		// then
		assertThat(result).isEqualTo("Delete failed.");
	}

	@Test
	void testGetUserCourseList() {
		// when
		when(mockUserService.getUser(anyString())).thenReturn(new User());
		Set<Course> results = testCourseService.getUserCourseList(anyString());

		// then
		verify(mockUserService).getUser(anyString());
		
	}
	
	@Test
	void testGetUserCourseListThrow() {
		// when 
		when(mockUserService.getUser(anyString())).thenThrow(new RuntimeException("Error occured"));
		Set<Course> results = testCourseService.getUserCourseList(anyString());
		
		// then
		assertThat(results).isEqualTo(new HashSet<Course>());
	}

	@Test
	void testDeleteCourse() {
		// given
		int courseId = anyInt();
		
		// when
		String result = testCourseService.deleteCourse(courseId);
		
		// then
		assertThat(result).isEqualTo("Success");
	}

	@Test
	void testDeleteCourseThrow() {
		// when
		doThrow(new RuntimeException("Error occured")).when(mockCourseRepository).deleteById(anyInt());
		String result = testCourseService.deleteCourse(anyInt());
		
		// then
		assertThat(result).isEqualTo("Delete failed.");
	}

}
