package com.coffeeclass.main.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="courselist")
public class Course {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int courseid;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description")
	private String description;

	public Course() {
		super();
	}

	public Course(int courseid, String title, String description) {
		super();
		this.courseid = courseid;
		this.title = title;
		this.description = description;
	}

	public int getCourseId() {
		return courseid;
	}

	public void setCourseId(int courseid) {
		this.courseid = courseid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
