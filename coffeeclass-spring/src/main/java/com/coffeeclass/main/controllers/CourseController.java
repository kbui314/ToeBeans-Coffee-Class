package com.coffeeclass.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
