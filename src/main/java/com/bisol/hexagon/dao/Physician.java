package com.bisol.hexagon.dao;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.ConstraintViolationException;

import org.hibernate.validator.constraints.br.CPF;

/**
 * Model for physician entity
 * @author bisol
 *
 */
@Entity
@Table(name="physician")
public class Physician {
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
	
	@Column(name="crm")
	private String crm;

	@ManyToMany
	@JoinTable
	private List<Specialty> specialties;
	
	public Physician() {
	}

	public Physician(String name, String cpf, String phone, String crm, List<Specialty> specialties) {
		this.name = name;
		this.cpf = cpf;
		this.phone = phone;
		this.crm = crm;
		this.specialties = specialties;
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
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCrm() {
		return crm;
	}
	public void setCrm(String crm) {
		this.crm = crm;
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
	public List<Specialty> getSpecialties() {
		return specialties;
	}
	public void setSpecialties(List<Specialty> specialties) {
		this.specialties = specialties;
	}
}
