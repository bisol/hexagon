package trash;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bisol.hexagon.dao.Person;
import com.bisol.hexagon.dao.PersonRepository;

/**
 * Provides a REST API end point for creating and querying patients.
 * @author bisol
 *
 */
@RestController
public class PatientResource {
//	private final Logger logger = LoggerFactory.getLogger(getClass().getName());
//	
//	private PersonRepository personRepository;
//	
//	public PatientResource(PersonRepository personRepository) {
//		this.personRepository = personRepository;
//	}
//	
////	public long create(PatientDTO patient) {
////		if(patient == null) throw new IllegalArgumentException();
////		return PersonDAO.getInstance().create(patient);
////	}
//
////	@RequestMapping("patients")
//	@RequestMapping(path="patients", method=RequestMethod.GET)
//	public PatientDTO[] query(@RequestParam(value="name", required=false) String name) {
//		try {
//			List<Person> people;
//			if(name != null && !name.isEmpty()) {
//				people = personRepository.findByName(name);
//			} else {
//				people = personRepository.findAll();				
//			}
//			PatientDTO[] d = new PatientDTO[1];
//			d[0] = new PatientDTO(new Person("Brno", "123", "456"));
//			return d;
////			List<PatientDTO> result = PersonDAO.getInstance().query(name);
////			if(result == null) return null;
////			return result.toArray(new PatientDTO[result.size()]);
//		} catch (Exception e) {
//			logger.error("Error querying patients", e);
//			throw new RuntimeException(e);
////			throw new WebApplicationException(500);
//		}
//	}
}