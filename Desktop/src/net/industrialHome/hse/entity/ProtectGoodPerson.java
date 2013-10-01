package net.industrialHome.hse.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="protectgoodperson")
public class ProtectGoodPerson extends BaseEntity<Long>{

	private PersonalInfo personalInfo;
	private ConsumingGoodsGroup consumingGoodsGroup;
	private ConsumingGood consumingGood;
	private float number;
	private float repeatDistance;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	
	@ManyToOne
	public PersonalInfo getPersonalInfoEntity() {
		return personalInfo;
	}
	public void setPersonalInfoEntity(PersonalInfo personalInfo) {
		this.personalInfo = personalInfo;
	}
	@ManyToOne
	public ConsumingGoodsGroup getConsumingGoodsGroup() {
		return consumingGoodsGroup;
	}
	public void setConsumingGoodsGroup(ConsumingGoodsGroup consumingGoodsGroup) {
		this.consumingGoodsGroup = consumingGoodsGroup;
	}
	@ManyToOne
	public ConsumingGood getConsumingGood() {
		return consumingGood;
	}
	public void setConsumingGood(ConsumingGood consumingGood) {
		this.consumingGood = consumingGood;
	}
	public float getNumber() {
		return number;
	}
	public void setNumber(float number) {
		this.number = number;
	}
	public float getRepeatDistance() {
		return repeatDistance;
	}
	public void setRepeatDistance(float repeatDistance) {
		this.repeatDistance = repeatDistance;
	}
}