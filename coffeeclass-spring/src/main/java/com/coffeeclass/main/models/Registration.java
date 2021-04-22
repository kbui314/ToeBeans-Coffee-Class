package com.coffeeclass.main.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "registration")
public class Registration {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int regid;
	
	@Column(name = "user_id")
	private int userid;
	
	@Column(name = "course_id")
	private int courseid;

	public Registration() {
		super();
	}

	public Registration(int regid, int userid, int courseid) {
		super();
		this.regid = regid;
		this.userid = userid;
		this.courseid = courseid;
	}

	public int getRegid() {
		return regid;
	}

	public void setRegid(int regid) {
		this.regid = regid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public int getCourseid() {
		return courseid;
	}

	public void setCourseid(int courseid) {
		this.courseid = courseid;
	}
	
}
