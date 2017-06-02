package com.bisol.hexagon.dao;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="specialty")
public class Specialty {
	@Id()
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	protected Long id;
	
	@Column(name="name")
	protected String name;
	
	@ManyToMany(mappedBy="specialties")
	private List<Physician> physicians; 
	
	public Specialty() {
	}
	
	public Specialty(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Physician> getPhysicians() {
		return physicians;
	}

	public void setPhysicians(List<Physician> physicians) {
		this.physicians = physicians;
	}
}
