package com.coffeeclass.main.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

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
	
	@Column(name="timeperiod")
	private String timeperiod;
	
	@Transient
	private List<User> enrollment;
	
//	@Column(name="enrollment")
//	@ManyToMany(fetch = FetchType.EAGER)
//	@JoinTable(name = "registration", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
//	private Set<User> enrollment;

	public Course() {
		super();
	}

	public Course(int courseid, String title, String description, String timeperiod) {
		super();
		this.courseid = courseid;
		this.title = title;
		this.description = description;
		this.timeperiod = timeperiod;
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
	
	public String getTimeperiod() {
		return timeperiod;
	}
	public void setTimeperiod(String timeperiod) {
		this.timeperiod = timeperiod;
	}

//	public Set<User> getEnrollment() {
//		return enrollment;
//	}

//	public void setEnrollment(Set<User> enrollment) {
//		this.enrollment = enrollment;
//	}
	
}
