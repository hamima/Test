package net.industrialHome.hse.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="countryStructure")
public class CountryStructure extends BaseEntity<Long>{
	
	private String name;
	private String code;
	private Integer level;
	
	private CountryStructure parent;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return super.getId();
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

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	@ManyToOne(fetch=FetchType.EAGER,optional=true)
	@JoinColumn(name="parent_id")
	public CountryStructure getParent() {
		return parent;
	}

	public void setParent(CountryStructure parent) {
		this.parent = parent;
	}
	
	
}
