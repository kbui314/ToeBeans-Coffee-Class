package com.coffeeclass.main.models;

import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
	
//	@ManyToMany(fetch = FetchType.EAGER)
//	@JoinTable(name="registration", 
//	joinColumns = @JoinColumn(name = "course_id"), 
//	inverseJoinColumns = @JoinColumn(name = "user_id"))
//	private Set<User> members;
	
	public Course() {
		super();
	}

	public Course(String title, String description, String timeperiod) {
		super();
//		this.courseid = courseid;
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

	@Override
	public int hashCode() {
		return Objects.hash(courseid, description, enrollment, timeperiod, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Course other = (Course) obj;
		return courseid == other.courseid && Objects.equals(description, other.description)
				&& Objects.equals(enrollment, other.enrollment) && Objects.equals(timeperiod, other.timeperiod)
				&& Objects.equals(title, other.title);
	}

//	public Set<User> getMembers() {
//		return members;
//	}
//
//	public void setMembers(Set<User> members) {
//		this.members = members;
//	}
}
