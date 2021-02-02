package com.coffeeclass.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeeclass.main.models.ContactForm;

public interface ContactRepository extends JpaRepository<ContactForm, Integer>{

}
