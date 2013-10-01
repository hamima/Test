package net.industrialHome.hse.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


@JsonAutoDetect
@Entity
@Table(name="warehouse")
public class Warehouse extends BaseEntity<Long>{
	
	private String name;
	private String code;
	private String descriptiveAddress;
	private String specificUse;
	private List<OrganizationStructure> organizations;
	private Long id;
	
	@Id
	@GeneratedValue
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
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescriptiveAddress() {
		return descriptiveAddress;
	}
	public void setDescriptiveAddress(String descriptiveAddress) {
		this.descriptiveAddress = descriptiveAddress;
	}
	public String getSpecificUse() {
		return specificUse;
	}
	public void setSpecificUse(String specificUse) {
		this.specificUse = specificUse;
	}
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany
	public List<OrganizationStructure> getOrganizations() {
		if(organizations == null)
			organizations = new ArrayList<OrganizationStructure>();
		return organizations;
	}
	public void setOrganizations(List<OrganizationStructure> organizations) {
		this.organizations = organizations;
	}

}
