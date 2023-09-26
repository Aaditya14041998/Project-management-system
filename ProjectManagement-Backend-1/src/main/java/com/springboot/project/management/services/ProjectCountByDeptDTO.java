package com.springboot.project.management.services;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProjectCountByDeptDTO {

	@JsonProperty("dept")
	private String dept;

	@JsonProperty("totalProjects")
	private Long totalProjects;

	@JsonProperty("closedProjects")
	private Long closedProjects;

	public ProjectCountByDeptDTO(String dept, Long totalProjects, Long closedProjects) {
		this.dept = dept;
		this.totalProjects = totalProjects;
		this.closedProjects = closedProjects;
	}
}
