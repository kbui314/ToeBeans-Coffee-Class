package com.coffeeclass.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coffeeclass.main.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>{

	Course findById(int courseId);
}
