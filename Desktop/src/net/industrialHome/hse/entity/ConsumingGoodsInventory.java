package net.industrialHome.hse.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="consuminggoodinventory")
public class ConsumingGoodsInventory extends BaseEntity<Long>{
	
	private Warehouse warehouse;
	private ConsumingGood consumingGood;
	private float certainExistingGood;
	private float leastOrderingQauntity;
	private float currentExist;
	private float untilNowExist;
	private float untilNowConsumption;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	
	@ManyToOne
	public Warehouse getWarehouse() {
		return warehouse;
	}
	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}
	@ManyToOne
	public ConsumingGood getConsumingGood() {
		return consumingGood;
	}
	public void setConsumingGood(ConsumingGood consumingGood) {
		this.consumingGood = consumingGood;
	}
	public float getCertainExistingGood() {
		return certainExistingGood;
	}
	public void setCertainExistingGood(float certainExistingGood) {
		this.certainExistingGood = certainExistingGood;
	}
	public float getLeastOrderingQauntity() {
		return leastOrderingQauntity;
	}
	public void setLeastOrderingQauntity(float leastOrderingQauntity) {
		this.leastOrderingQauntity = leastOrderingQauntity;
	}
	public float getCurrentExist() {
		return currentExist;
	}
	public void setCurrentExist(float currentExist) {
		this.currentExist = currentExist;
	}
	public float getUntilNowExist() {
		return untilNowExist;
	}
	public void setUntilNowExist(float untilNowExist) {
		this.untilNowExist = untilNowExist;
	}
	public float getUntilNowConsumotion() {
		return untilNowConsumption;
	}
	public void setUntilNowConsumotion(float untilNowConsumotion) {
		this.untilNowConsumption = untilNowConsumotion;
	}
}
