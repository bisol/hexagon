package com.bisol.hexagon.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Data access object for "Specialty" entity. Spring Boot will publish it as a REST service,
 * with CRUD routes and custom query below. 
 * @author bisol
 *
 */
public interface SpecialtyRepository extends PagingAndSortingRepository<Specialty, Long> {
	/**
	 * Finds Specialties with "name" containing supplied input 
	 * @param name query string
	 * @return
	 */
	Page<Specialty> findByNameContaining(@Param("name") String name, Pageable page);
}
