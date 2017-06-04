package com.bisol.hexagon.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Data access object for "Physician" entity. Spring Boot will publish it as a REST service,
 * with CRUD routes and custom query below. 
 * @author bisol
 *
 */
public interface PhysicianRepository extends PagingAndSortingRepository<Physician, Long> {
	/**
	 * Finds physicians with "name" containing supplied input 
	 * @param name query string
	 * @return
	 */
	Page<Physician> findByNameContaining(@Param("name") String name, Pageable page);
}
