package com.coffeeclass.main.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.Course;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.CourseRepository;
import com.coffeeclass.main.repository.RegistrationRepository;

@Service
public class CourseService {
	
	private final CourseRepository courseRepository;
	private final RegistrationRepository registrationRepository;
	private final UserService userService;
	
	@Autowired
	public CourseService(CourseRepository courseRepository, RegistrationRepository registrationRepository, UserService userService) {
		this.courseRepository = courseRepository;
		this.registrationRepository = registrationRepository;
		this.userService = userService;
	}

	public List<Course> getCourseList() {
		try {
			return courseRepository.findAll();
		}catch(Exception e) {
			return null;
		}
	}
		
	public Course getCourse(int courseId) {
		try {
			return courseRepository.findById(courseId);
		}catch(Exception e) {
			return null;
		}
	}
	
	public Course addCourse(Course newCourse) {
		try {
			courseRepository.save(newCourse);
			return newCourse;
		}catch(Exception e) {
			return new Course();
		}
	}
	
	public String registration(int courseId, String username) {
		try {
			User user = userService.getUser(username);
			Course course = getCourse(courseId);
			if(user.getCourses().contains(course)) {
				return "registered";
			}else {
				user.addCourse(course);
			}
			user.addCourse(course);
			userService.saveUser(user);
			return "success";
		}catch(Exception e) {
			return "failed";
		}
	}
	
	public String deleteUserCourse(int courseId, String username) {
		try {
			User user = userService.getUser(username);
			Course course = getCourse(courseId);
			if(!user.getCourses().contains(course)) {
				return "Course not found.";
			}else {
				Set<Course> courses = user.getCourses();
				courses.remove(course);
				user.setCourses(courses);
				userService.saveUser(user);
				return "Success";
			}
		}catch(Exception e) {
			return "Delete failed.";
		}
	}
	
	public Set<Course> getUserCourseList(String username){
		try {
			User user = userService.getUser(username);
			return user.getCourses();
		}catch(Exception e) {
			return new HashSet<Course>();
		}
	}
	
	public String deleteCourse(int courseId) {
		try {
			courseRepository.deleteById(courseId);
			return "Success";
		}catch(Exception e) {
			return "Delete failed.";
		}
	}
	
}
