package net.industrialHome.hse.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import net.industrialHome.hse.Enums.BloodType;
import net.industrialHome.hse.Enums.ClothesSize;
import net.industrialHome.hse.Enums.YesOrNo;

@JsonAutoDetect
@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@Table(name="personal_info")
public class PersonalInfo extends BaseEntity<Long> {

	
	private String firstName;
	private String lastName;
	private String email;
	private String cellphone;
	private String telephone;
	private String emergencyPhone;
	private String nationalCode;
	private String personelCode;
	
	private Post post;
	
	private String medicalDocNumber;
	private ClothesSize clothesSize;
	private Integer footSize;
	private Integer height;
	private Float weight;
	private BloodType bloodType;
	
	private String userName;
	private String password;
	private YesOrNo passMustBeChange;
	private YesOrNo blocked;
	
	private List<OrganizationStructure> workingAt;
	
	
	
	@Id
	@GeneratedValue
	@Column(name="user_ID")
	public Long getId() {
		return super.getId();
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmergencyPhone() {
		return emergencyPhone;
	}

	public void setEmergencyPhone(String emergencyPhone) {
		this.emergencyPhone = emergencyPhone;
	}

	public String getNationalCode() {
		return nationalCode;
	}

	public void setNationalCode(String nationalCode) {
		this.nationalCode = nationalCode;
	}

	public String getPersonelCode() {
		return personelCode;
	}

	public void setPersonelCode(String personelCode) {
		this.personelCode = personelCode;
	}
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="post_id")
	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}
	
	public String getMedicalDocNumber() {
		return medicalDocNumber;
	}
	public void setMedicalDocNumber(String medicalDocNumber) {
		this.medicalDocNumber = medicalDocNumber;
	}
	public ClothesSize getClothesSize() {
		return clothesSize;
	}
	public void setClothesSize(ClothesSize clothesSize) {
		this.clothesSize = clothesSize;
	}
	public Integer getFootSize() {
		return footSize;
	}
	public void setFootSize(Integer footSize) {
		this.footSize = footSize;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public Float getWeight() {
		return weight;
	}
	public void setWeight(Float weight) {
		this.weight = weight;
	}
	public BloodType getBloodType() {
		return bloodType;
	}
	public void setBloodType(BloodType bloodType) {
		this.bloodType = bloodType;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public YesOrNo getPassMustBeChange() {
		return passMustBeChange;
	}

	public void setPassMustBeChange(YesOrNo passMustBeChange) {
		this.passMustBeChange = passMustBeChange;
	}

	public YesOrNo getBlocked() {
		return blocked;
	}

	public void setBlocked(YesOrNo blocked) {
		this.blocked = blocked;
	}

	@OneToMany(fetch=FetchType.EAGER)
	@JoinTable(name = "person_organ",
    joinColumns = {@JoinColumn(name = "user_id",referencedColumnName="user_ID")},
    inverseJoinColumns = {@JoinColumn(name = "organ_id",referencedColumnName="id")})
	public List<OrganizationStructure> getWorkingAt() {
		return workingAt;
	}

	public void setWorkingAt(List<OrganizationStructure> workingAt) {
		this.workingAt = workingAt;
	}
	
}
