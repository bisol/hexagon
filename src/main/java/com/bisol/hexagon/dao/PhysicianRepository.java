package com.bisol.hexagon.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface PhysicianRepository extends PagingAndSortingRepository<Physician, Long> {
	Page<Physician> findByNameContaining(@Param("name") String name, Pageable page);
}
