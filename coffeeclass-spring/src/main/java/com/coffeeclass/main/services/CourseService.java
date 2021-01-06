package com.coffeeclass.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffeeclass.main.models.Course;
import com.coffeeclass.main.repository.CourseRepository;

@Service
public class CourseService {
	
	@Autowired
	CourseRepository courseRepository;

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
}
