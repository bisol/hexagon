package trash;

import com.bisol.hexagon.dao.Person;

/**
 * Patient serialization POJO
 * @author bisol
 *
 */
public class PatientDTO {
	private String name, cpf, phone;

	public PatientDTO(Person p) {
		this.name = p.getName();
		this.cpf = p.getCpf();
		this.phone = p.getPhone();
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
