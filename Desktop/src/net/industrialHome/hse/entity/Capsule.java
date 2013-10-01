package net.industrialHome.hse.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import net.industrialHome.hse.Enums.CapsulType;
import net.industrialHome.hse.Enums.YesOrNo;
import net.industrialHome.hse.util.JsonDateSerializer;

@Entity
@Table(name="capsule")
public class Capsule extends Equipment {
	
	private String model;
	private String serialNumber;
	private CapsulType type;
	private Date droppingDate;
	private float capacity;
	private YesOrNo reserve;
	
	private List<CapsuleLocation> locations;
	
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	
	public CapsulType getType() {
		return type;
	}
	
	public void setType(CapsulType type) {
		this.type = type;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDroppingDate() {
		return droppingDate;
	}
	
	public void setDroppingDate(Date droppingDate) {
		this.droppingDate = droppingDate;
	}
	
	public float getCapacity() {
		return capacity;
	}
	
	public void setCapacity(float capacity) {
		this.capacity = capacity;
	}
	
	public YesOrNo getReserve() {
		return reserve;
	}
	
	public void setReserve(YesOrNo reserve) {
		this.reserve = reserve;
	}
	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinTable(name = "capsule_capsulelocation",
    joinColumns = {@JoinColumn(name = "capsule_id", referencedColumnName = "id")}, 
    inverseJoinColumns = {@JoinColumn(name = "locations_id", referencedColumnName = "id")},
    uniqueConstraints={
			   @UniqueConstraint(columnNames={"capsule_id", "locations_id"})})
	public List<CapsuleLocation> getLocations() {
		return locations;
	}
	
	public void setLocations(List<CapsuleLocation> locations) {
		this.locations = locations;
	}
	
}
