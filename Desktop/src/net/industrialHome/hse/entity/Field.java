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
@Table(name="field")
public class Field extends BaseEntity<Long>{
	
	private Long id;
	private String name;
	private String defaultValue;
	
	private TablesEntity tables;

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

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="table_id")
	public TablesEntity getTables() {
		return tables;
	}

	public void setTables(TablesEntity tables) {
		this.tables = tables;
	}

	
	
	
}
