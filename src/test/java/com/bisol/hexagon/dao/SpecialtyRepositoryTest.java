package com.bisol.hexagon.dao;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SpecialtyRepositoryTest {
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private SpecialtyRepository specialtyRepository;
	
	@Before
	public void deleteAllBeforeTests() throws Exception {
		specialtyRepository.deleteAll();
	}

	@Test
	public void shouldCreateEntity() throws Exception {
		mockMvc.perform(post("/specialties")
				.content("{\"name\": \"test\"}"))
				.andExpect(status().isCreated()).andExpect(header().string("Location", containsString("specialties/")));
	}

	@Test
	public void shouldRetrieveEntity() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/specialties")
				.content("{\"name\": \"test create\"}"))
				.andExpect(status().isCreated()).andReturn();

		String location = mvcResult.getResponse().getHeader("Location");
		mockMvc.perform(get(location)).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("test create"));
	}

	@Test
	public void shouldQueryEntity() throws Exception {
		mockMvc.perform(post("/specialties")
				.content("{\"name\": \"test\"}"))
				.andExpect(status().isCreated());

		mockMvc.perform(get("/specialties/search/findByNameContaining?name={name}", "test"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.specialties[0].name").value("test"));
	}

	@Test
	public void shouldUpdateEntity() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/specialties")
				.content("{\"name\": \"test\"}"))
				.andExpect(status().isCreated()).andReturn();

		String location = mvcResult.getResponse().getHeader("Location");

		mockMvc.perform(put(location).content("{\"name\": \"updated name\"}"))
				.andExpect(status().isNoContent());

		mockMvc.perform(get(location)).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("updated name"));
	}

	@Test
	public void shouldDeleteEntity() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/specialties")
				.content("{\"name\": \"test\"}"))
				.andExpect(status().isCreated()).andReturn();

		String location = mvcResult.getResponse().getHeader("Location");
		mockMvc.perform(delete(location)).andExpect(status().isNoContent());
		mockMvc.perform(get(location)).andExpect(status().isNotFound());
	}
}
