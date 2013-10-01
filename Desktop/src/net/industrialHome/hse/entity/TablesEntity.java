package net.industrialHome.hse.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="tables")
public class TablesEntity extends BaseEntity<Long>{
	
	private String name;
	private boolean accessable;
	
	private List<Field> fields;
	
	@Id
	@GeneratedValue
	@Column(name="table_id")
	public Long getId() {
		return super.getId();
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isAccessable() {
		return accessable;
	}
	public void setAccessable(boolean accessable) {
		this.accessable = accessable;
	}

	@OneToMany(fetch=FetchType.EAGER,mappedBy="tables")
	public List<Field> getFields() {
		return fields;
	}

	public void setFields(List<Field> fields) {
		this.fields = fields;
	}
	
	
}
