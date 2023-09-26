package com.springboot.project.management.services;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProjectCountByStatusDTO {

	@JsonProperty("status")
	private String status;

	@JsonProperty("count")
	private Long count;
	public ProjectCountByStatusDTO(String status, Long count) {
		super();
		this.status = status;
		this.count = count;
	}
	
}
