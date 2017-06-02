package trash;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class PersonDAO {
//	private static PersonDAO instance;
//	private EntityManager entityManager;
//	
//	private PersonDAO() {
//		EntityManagerFactory sessionFactory = Persistence.createEntityManagerFactory("hexagon");
//		entityManager = sessionFactory.createEntityManager();
//		
//	}
//	public static PersonDAO getInstance() throws Exception {
//		if(instance == null) instance = new PersonDAO();
//		return instance;
//	}
//	
//	public long create(PatientDTO patient) {
//		Person person = new Person(patient.getName(), patient.getCpf(), patient.getPhone());
//		entityManager.persist(person);
//		return person.id;
//	}
//	
//	public List<PatientDTO> query(String name) {
//		StringBuilder query = new StringBuilder("from Person");
//		if(name != null && !name.isEmpty()) {
//			query.append(" where name like %").append(name).append("%");
//		}
//		List<Person> persons = entityManager.createQuery(query.toString(), Person.class).getResultList();
//		
//		if(persons == null || persons.isEmpty()) return null;
//		
//		List<PatientDTO> patients = new ArrayList<PatientDTO>(persons.size());
//		for(Person p : persons) {
//			patients.add(new PatientDTO(p));
//		}
//		return patients;
//	}
}
