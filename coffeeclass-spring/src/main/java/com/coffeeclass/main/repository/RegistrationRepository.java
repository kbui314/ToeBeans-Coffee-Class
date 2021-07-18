package com.coffeeclass.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeeclass.main.models.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Integer>{

	List<Registration> findAllByCourseid(int courseId);
}
