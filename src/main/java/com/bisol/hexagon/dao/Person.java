package com.bisol.hexagon.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.ConstraintViolationException;

import org.hibernate.validator.constraints.br.CPF;

/**
 * Model for patient entity
 * @author bisol
 *
 */
@Entity
@Table(name="person")
public class Person {
	@Id()
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="cpf")
	@CPF(message="Invalid CPF")
	private String cpf;
	
	@Column(name="phone")
	private String phone;
	
	public Person() {
	}
	
	public Person(String name, String cpf, String phone) {
		this.name = name;
		this.cpf = cpf;
		this.phone = phone;
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

	public String getCpf() {
		return cpf;
	}

	/**
	 * @throws ConstraintViolationException if values is not a valid CPF  
	 * @param cpf
	 */
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
