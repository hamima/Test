package net.industrialHome.hse.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="deliveredgood")
public class DeliverGood extends BaseEntity<Long>{
	
	private ProtectGoodPerson protectGoodPerson;
	private ProtectGoodPost protectGoodPost;
	private Warehouse warehouse;
	private Date deliverDate;
	private String deliverFormNumber;
	private String tahvildahandeh;
	private float deliverNumber;
	private boolean deliverConfirm;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public Date getDeliverDate() {
		return deliverDate;
	}
	public void setDeliverDate(Date deliverDate) {
		this.deliverDate = deliverDate;
	}
	public String getDeliverFormNumber() {
		return deliverFormNumber;
	}
	public void setDeliverFormNumber(String deliverFormNumber) {
		this.deliverFormNumber = deliverFormNumber;
	}
	public String getTahvildahandeh() {
		return tahvildahandeh;
	}
	public void setTahvildahandeh(String tahvildahandeh) {
		this.tahvildahandeh = tahvildahandeh;
	}
	public float getDeliverNumber() {
		return deliverNumber;
	}
	public void setDeliverNumber(float deliverNumber) {
		this.deliverNumber = deliverNumber;
	}
	public boolean isDeliverConfirm() {
		return deliverConfirm;
	}
	public void setDeliverConfirm(boolean deliverConfirm) {
		this.deliverConfirm = deliverConfirm;
	}
	@ManyToOne
	public ProtectGoodPerson getProtectGoodPerson() {
		return protectGoodPerson;
	}
	public void setProtectGoodPerson(ProtectGoodPerson protectGoodPerson) {
		this.protectGoodPerson = protectGoodPerson;
	}
	@ManyToOne
	public ProtectGoodPost getProtectGoodPost() {
		return protectGoodPost;
	}
	public void setProtectGoodPost(ProtectGoodPost protectGoodPost) {
		this.protectGoodPost = protectGoodPost;
	}
	@ManyToOne
	public Warehouse getWarehouse() {
		return warehouse;
	}
	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}
}
