package net.industrialHome.hse.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="inventorylog")
public class InventoryLog extends BaseEntity<Long>{
	
	private Date date;
	private String request;
	private String shomareh;
	private float quantity;
	private String reason;
	private ConsumingGood consumingGood;
	private Long id;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getRequest() {
		return request;
	}
	public void setRequest(String request) {
		this.request = request;
	}
	public String getShomareh() {
		return shomareh;
	}
	public void setShomareh(String shomareh) {
		this.shomareh = shomareh;
	}
	public float getQuantity() {
		return quantity;
	}
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	@ManyToOne
	public ConsumingGood getConsumingGood() {
		return consumingGood;
	}
	public void setConsumingGood(ConsumingGood consumingGood) {
		this.consumingGood = consumingGood;
	}
}