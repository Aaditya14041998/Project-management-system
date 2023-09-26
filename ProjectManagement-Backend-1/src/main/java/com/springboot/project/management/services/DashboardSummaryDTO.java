package com.springboot.project.management.services;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DashboardSummaryDTO {
	@JsonProperty("statusCounters")
	private List<ProjectCountByStatusDTO> statusCounters;

	@JsonProperty("deptCounters")
	private List<ProjectCountByDeptDTO> deptCounters;

	public DashboardSummaryDTO(List<ProjectCountByStatusDTO> statusCounters, List<ProjectCountByDeptDTO> deptCounters) {
		super();
		this.statusCounters = statusCounters;
		this.deptCounters = deptCounters;
	}

}