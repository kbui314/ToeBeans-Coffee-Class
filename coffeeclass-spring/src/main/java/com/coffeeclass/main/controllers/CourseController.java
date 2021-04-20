package com.coffeeclass.main.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coffeeclass.main.models.Course;
import com.coffeeclass.main.services.CourseService;

@RestController
public class CourseController {
	
	@Autowired
	CourseService courseService;
	
	@GetMapping("/classes")
	public List<Course> getClassList() {
		return courseService.getCourseList();
	}
	
	@GetMapping("/classes/{id}")
	public Course getClass(@PathVariable String id) {
		return courseService.getCourse(Integer.parseInt(id));
	}
	
	@PostMapping("/classes/register/{id}")
	public String registerForCourse(@PathVariable int id, Authentication authentication) {
		return courseService.registration(id, authentication.getName());
	}
	
	@PostMapping("/classes/delete/{id}")
	public String deleteUserCourse(@PathVariable int id, Authentication authentication) {
		return courseService.deleteUserCourse(id, authentication.getName());
	}
	
	@GetMapping("/classes/user")
	public Set<Course> getUserCourse(Authentication authentication){
		return courseService.getUserCourseList(authentication.getName());
	}
	
	@PostMapping("/classes/addcourse")
	public Course addNewCourse(@RequestBody Course course) {
		return courseService.addCourse(course);
	}
	
}
