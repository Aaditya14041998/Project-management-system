package com.springboot.project.management.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="projects")
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id")
	private long projectId;
	
	@Column(name="project_theme")
	private String projectTheme;
	
	@Column(name="reason")
	private String reason;
	
	@Column(name="type")
	private String type;

	@Column(name="division")
	private String division;
	
	@Column(name="category")
	private String category;
	
	@Column(name = "priority")
	private String priority;
	
	@Column(name = "department")
	private String department;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "start_date")
	private Date startDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "status")
	private String status;

	public Project() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Project(long projectId, String projectTheme, String reason, String type, String division, String category,
			String priority, String department, Date startDate, Date endDate, String location, String status) {
		super();
		this.projectId = projectId;
		this.projectTheme = projectTheme;
		this.reason = reason;
		this.type = type;
		this.division = division;
		this.category = category;
		this.priority = priority;
		this.department = department;
		this.startDate = startDate;
		this.endDate = endDate;
		this.location = location;
		this.status = status;
	}

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public String getProjectTheme() {
		return projectTheme;
	}

	public void setProjectTheme(String projectTheme) {
		this.projectTheme = projectTheme;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Project [projectId=" + projectId + ", projectTheme=" + projectTheme + ", reason=" + reason + ", type="
				+ type + ", division=" + division + ", category=" + category + ", priority=" + priority
				+ ", department=" + department + ", startDate=" + startDate + ", endDate=" + endDate + ", location="
				+ location + ", status=" + status + "]";
	}

	
}
