package com.bisol.hexagon.dao;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PhysicianRepositoryTest {
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private PhysicianRepository physicianRepository;
	
	@Before
	public void deleteAllBeforeTests() throws Exception {
		physicianRepository.deleteAll();
	}
	
	@Test
	public void testInsertValidData() {
		Physician physician = new Physician("test name", "629.802.252-07", "9876-1234", "123/sc", null); 
		physicianRepository.save(physician);
	}

	// test cpf validation
	@Test(expected=ConstraintViolationException.class)
	public void testInsertInvalidData() {
		Physician physician = new Physician("test name", "000.000.000-00", "9876-1234", "123/sc", null); 
		physicianRepository.save(physician);		
	}

	@Test
	public void shouldCreateEntity() throws Exception {
		mockMvc.perform(post("/physicians")
				.content("{\"name\": \"test\", \"cpf\":\"629.802.252-07\", \"phone\": \"9876-1234\"}"))
				.andExpect(status().isCreated()).andExpect(header().string("Location", containsString("physicians/")));
	}

	@Test
	public void shouldRetrieveEntity() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/physicians")
				.content("{\"name\": \"test create\", \"cpf\":\"629.802.252-07\", \"phone\": \"9876-2345\"}"))
				.andExpect(status().isCreated()).andReturn();

		String location = mvcResult.getResponse().getHeader("Location");
		mockMvc.perform(get(location)).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("test create"))
				.andExpect(jsonPath("$.cpf").value("629.802.252-07"))
				.andExpect(jsonPath("$.phone").value("9876-2345"));
	}

	@Test
	public void shouldQueryEntity() throws Exception {
		mockMvc.perform(post("/physicians")
				.content("{\"name\": \"test\", \"cpf\":\"629.802.252-07\", \"phone\": \"9876-1234\"}"))
				.andExpect(status().isCreated());

		mockMvc.perform(get("/physicians/search/findByNameContaining?name={name}", "test"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.physicians[0].name").value("test"));
	}

	@Test
	public void shouldUpdateEntity() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/physicians")
				.content("{\"name\": \"test\", \"cpf\":\"629.802.252-07\", \"phone\": \"9876-1234\"}"))
				.andExpect(status().isCreated()).andReturn();

		String location = mvcResult.getResponse().getHeader("Location");

		mockMvc.perform(put(location).content("{\"name\": \"updated name\"}"))
				.andExpect(status().isNoContent());

		mockMvc.perform(get(location)).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("updated name"));
	}

	@Test
	public void shouldDeleteEntity() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/physicians")
				.content("{\"name\": \"test\", \"cpf\":\"629.802.252-07\", \"phone\": \"9876-1234\"}"))
				.andExpect(status().isCreated()).andReturn();

		String location = mvcResult.getResponse().getHeader("Location");
		mockMvc.perform(delete(location)).andExpect(status().isNoContent());
		mockMvc.perform(get(location)).andExpect(status().isNotFound());
	}
	
	@Test
	@SuppressWarnings("unchecked")
	public void shouldAddSpecialty() throws Exception {
		MvcResult specialtyResult = mockMvc.perform(post("/specialties").content("{\"name\": \"oncologist\"}"))
				.andExpect(status().isCreated()).andReturn();
		String specialtyLocation = specialtyResult.getResponse().getHeader("Location");
		
		String physicianRequest = "{\"name\": \"test\", "
				+ "\"cpf\":\"629.802.252-07\", "
				+ "\"phone\": \"9876-1234\", "
				+ "\"crm\": \"123/sc\", "
				+ "\"specialties\": [\"" + specialtyLocation + "\"]}";
		MvcResult physicianResult = mockMvc.perform(post("/physicians").content(physicianRequest))
				.andExpect(status().isCreated()).andReturn();

		String physicianLocation = physicianResult.getResponse().getHeader("Location");
		physicianResult = mockMvc.perform(get(physicianLocation)).andExpect(status().isOk())
				.andExpect(jsonPath("$._links.specialties").exists()).andReturn();
		
		String physicianResultString = physicianResult.getResponse().getContentAsString();
		Map<String, Object> physicianObject= JsonParserFactory.getJsonParser().parseMap(physicianResultString);
		Map<String, Object> physicianLinks = (Map<String, Object>) physicianObject.get("_links");
		Map<String, String> physicianSpecialties = (Map<String, String>) physicianLinks.get("specialties");
		String physicianSpecialtiesRef = physicianSpecialties.values().iterator().next();
		mockMvc.perform(get(physicianSpecialtiesRef)).andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.specialties[0].name").value("oncologist"));

	}
}
