package trash;

/**
 * Physician serialization POJO
 * @author bisol
 *
 */
public class PhysicianDTO {
	private String name, crm, cpf, phone;
	private String[] specialties;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String[] getSpecialties() {
		return specialties;
	}
	public void setSpecialties(String[] specialties) {
		this.specialties = specialties;
	}
}
