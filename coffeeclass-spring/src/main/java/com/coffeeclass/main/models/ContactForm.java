package com.coffeeclass.main.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "contactform")
public class ContactForm {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int formid;
	@Column(name = "firstname")
	private String firstName;
	@Column(name = "lastname")
	private String lastName;
	@Column(name = "email")
	private String email;
	@Column(name = "description")
	private String description;
	public ContactForm() {
		super();
	}
	public ContactForm(int formid, String firstName, String lastName, String email, String description) {
		super();
		this.formid = formid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.description = description;
	}
	public int getFormId() {
		return formid;
	}
	public void setFormId(int formid) {
		this.formid = formid;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
