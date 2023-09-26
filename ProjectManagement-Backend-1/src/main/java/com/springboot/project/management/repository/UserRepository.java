package com.springboot.project.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.springboot.project.management.model.User;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	 
	@Query("SELECT u FROM User u WHERE u.emailId = ?1 AND u.password = ?2")
	User findByEmailAndPassword(String email, String password);
}

