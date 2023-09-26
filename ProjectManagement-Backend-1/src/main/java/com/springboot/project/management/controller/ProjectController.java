package com.springboot.project.management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.springboot.project.management.model.Project;
import com.springboot.project.management.repository.ProjectRepository;
import com.springboot.project.management.services.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepository;

	// create project api
	@PostMapping("/project")
	public ResponseEntity<Map<String, String>> createProject(@RequestBody Project project) {
		projectRepository.save(project);
		if (project == null) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("status", "false");
			errorResponse.put("message", "Project not inserted");
			return ResponseEntity.status(HttpStatus.OK).body(errorResponse);

		}

		Map<String, String> successResponse = new HashMap<>();
		successResponse.put("success", "true");
		successResponse.put("message", "Project inserted successfully");
		return ResponseEntity.status(HttpStatus.OK).body(successResponse);

	}

	// get all projects
	@GetMapping("/projects")
	public List<Project> getAllProject() {
		
		return projectRepository.findAll();
	}

	// get all projects summary
	@GetMapping("/summary")
	public DashboardSummaryDTO getDashboardSummary() {

		List<ProjectCountByDeptDTO> projectCounts = new ArrayList<>();

		Long totalProjectCount = projectRepository.getTotalProjectCount();

		List<Object[]> result = projectRepository.getProjectCountsByDept();
		for (Object[] row : result) {
			String dept = (String) row[0];
			Long totalProjects = (Long) row[1];
			Long closedProjects = (Long) row[2];

			ProjectCountByDeptDTO projectCountDTO = new ProjectCountByDeptDTO(dept, totalProjects, closedProjects);
			projectCounts.add(projectCountDTO);
		}
		
		

		List<ProjectCountByStatusDTO> projectCountsByStatus = new ArrayList<>();

        // Add the total count as a separate entry in the result list
        ProjectCountByStatusDTO totalProjectCountDTO = new ProjectCountByStatusDTO("Total Projects", totalProjectCount);

        projectCountsByStatus.add(totalProjectCountDTO);
        

		List<Object[]> projectResultByStatus = projectRepository.getProjectCountsByStatus();
		long totalProject = 0;
		for (Object[] row : projectResultByStatus) {
			String status = (String) row[0];
			Long count = (Long) row[1];
			totalProject = totalProject + count;

			ProjectCountByStatusDTO projectCountDTO = new ProjectCountByStatusDTO(status, count);
			projectCountsByStatus.add(projectCountDTO);
		}
		//System.out.println("projectCountDTO ", projectCounts);
        
        Long totalCloserDelayProjectCount = projectRepository.getClosureDelayProjectCount();

        // Add the total count as a separate entry in the result list
        ProjectCountByStatusDTO totalClosureDelayProjectDTO = new ProjectCountByStatusDTO("Closer Delay", totalCloserDelayProjectCount);
		//System.out.println("projectCountDTO ", projectCounts);
        projectCountsByStatus.add(totalClosureDelayProjectDTO);
        
        DashboardSummaryDTO dashboardCounters = new DashboardSummaryDTO(projectCountsByStatus, projectCounts);
		return dashboardCounters;

	}

	// update project api
	@PutMapping("/project/{projectId}")
	public ResponseEntity<Map<String, String>> updateProject(@PathVariable Long projectId, @RequestBody Project projectDetails) {
		Project project = projectRepository.findById(projectId).orElseThrow();
		project.setProjectId(projectDetails.getProjectId());
		project.setStatus(projectDetails.getStatus());

		projectRepository.save(project);

		Map<String, String> successResponse = new HashMap<>();
		successResponse.put("success", "true");
		successResponse.put("message", "Status updated successfully");
		return ResponseEntity.status(HttpStatus.OK).body(successResponse);
		
	}

}
