package net.industrialHome.hse.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="consuminggood")
public class ConsumingGood extends BaseEntity<Long>{
	
	private String name;
	private String code;
	private String specificProps;
	private ConsumingGoodsGroup consumingGoodsGroup;
	private Long id;

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne
	public ConsumingGoodsGroup getConsumingGoodsGroup() {
		return consumingGoodsGroup;
	}
	public void setConsumingGoodsGroup(ConsumingGoodsGroup consumingGoodsGroup) {
		this.consumingGoodsGroup = consumingGoodsGroup;
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
	public String getSpecificProps() {
		return specificProps;
	}
	public void setSpecificProps(String specificProps) {
		this.specificProps = specificProps;
	}
}