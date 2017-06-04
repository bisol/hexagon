package com.bisol.hexagon.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Data access object for "Person" entity. Spring Boot will publish it as a REST service,
 * with CRUD routes and custom query below. 
 * @author bisol
 *
 */
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {
	/**
	 * Finds people with "name" containing supplied input 
	 * @param name query string
	 * @return
	 */
	Page<Person> findByNameContaining(@Param("name") String name, Pageable page);
}
