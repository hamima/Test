package net.industrialHome.hse.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import net.industrialHome.hse.Enums.FlowTypes;

@JsonAutoDetect
@Entity
@Table(name="flowStructure")
public class FlowStructure extends BaseEntity<Long>{

	private String name;
	private String code;
	private FlowTypes type;
	private Integer level;
	
	private List<FlowStructure> inputFlows;
	
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

	public FlowTypes getType() {
		return type;
	}

	public void setType(FlowTypes type) {
		this.type = type;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	
	@ManyToMany(fetch=FetchType.EAGER)
	public List<FlowStructure> getInputFlows() {
		return inputFlows;
	}

	public void setInputFlows(List<FlowStructure> inputFlows) {
		this.inputFlows = inputFlows;
	}

	

}
