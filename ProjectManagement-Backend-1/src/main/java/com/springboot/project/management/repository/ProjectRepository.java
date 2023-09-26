package com.springboot.project.management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.springboot.project.management.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	 @Query("SELECT COUNT(CASE WHEN end_date < CURRENT_DATE() THEN 1 ELSE NULL END) FROM Project")
	 Long getClosureDelayProjectCount();

	 @Query("SELECT p.status AS status, COUNT(*) AS count FROM Project p GROUP BY p.status")
	 List<Object[]> getProjectCountsByStatus();
	 
	 @Query("SELECT COUNT(*) FROM Project")
	 Long getTotalProjectCount();
	 

	 @Query("SELECT department, COUNT(*) AS total_projects, COUNT(CASE WHEN status = 'Closed' THEN 1 ELSE NULL END) AS closed_projects FROM Project GROUP BY department")
	 List<Object[]> getProjectCountsByDept();
}
 