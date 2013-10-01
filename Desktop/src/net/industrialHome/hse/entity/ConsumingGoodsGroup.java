package net.industrialHome.hse.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import net.industrialHome.hse.Enums.Rasteh;

@JsonAutoDetect
@Entity
@Table(name="consumingGoodsGroup")
public class ConsumingGoodsGroup extends BaseEntity<Long>{

	private Long id;
	private String description;
	private String code;
	private String metric;
	private Rasteh rasteh;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Rasteh getRasteh() {
		return rasteh;
	}
	public void setRasteh(Rasteh rasteh) {
		this.rasteh = rasteh;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMetric() {
		return metric;
	}
	public void setMetric(String metric) {
		this.metric = metric;
	}
}
