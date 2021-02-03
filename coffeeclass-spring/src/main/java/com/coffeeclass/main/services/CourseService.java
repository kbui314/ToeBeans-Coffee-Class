package com.coffeeclass.main.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.Course;
import com.coffeeclass.main.models.User;
import com.coffeeclass.main.repository.CourseRepository;

@Service
public class CourseService {
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	UserService userService;

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
	
	public Set<Course> getUserCourseList(String username){
		try {
			User user = userService.getUser(username);
			return user.getCourses();
		}catch(Exception e) {
			return new HashSet<Course>();
		}
	}
}
