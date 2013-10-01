package net.industrialHome.hse.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import net.industrialHome.hse.Enums.EquipmentTypes;

@JsonAutoDetect
@Entity
@Table(name="equipment_type")
public class EquipmentType extends BaseEntity<Long>{
	
	private String name;
	private EquipmentTypes type;
	private String defaults;
	private int num;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public EquipmentTypes getType() {
		return type;
	}

	public void setType(EquipmentTypes type) {
		this.type = type;
	}

	@Column(name="defaults")
	@Lob
	public String getDefaults() {
		return defaults;
	}

	public void setDefaults(String defaults) {
		this.defaults = defaults;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}
	
}
