package com.bisol.hexagon.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {
	Page<Person> findByNameContaining(@Param("name") String name, Pageable page);
}
