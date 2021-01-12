package com.coffeeclass.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
//		return null;
	}
	
	@PostMapping("/classes/register/{id}")
	public String registerForCourse(@PathVariable int id) {
		return null;
	}
}
