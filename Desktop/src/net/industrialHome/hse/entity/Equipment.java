package net.industrialHome.hse.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


import net.industrialHome.hse.Enums.YesOrNo;
import net.industrialHome.hse.util.JsonDateSerializer;

@JsonAutoDetect
@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@Table(name="equipment")
public class Equipment extends BaseEntity<Long>{
	
	private String eqNumber;
	private int shomarePeyman;
	private String address;
	private String executer;
	private Date lunchTime;
	private String longtitute;
	private String latitute;
	private String height;
	private YesOrNo gathered;
	private Date gatheringDate;
	private String gatheringNotes;
	private YesOrNo locked;
	
	private List<FlowStructure> flows;
	private CountryStructure countryStructure; 
	private EquipmentType eqType;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	 
	public String getEqNumber() {
		return eqNumber;
	}
	public void setEqNumber(String eqNumber) {
		this.eqNumber = eqNumber;
	}
	
	@Column(name="shomarepeyman")
	public int getShomarePeyman() {
		return shomarePeyman;
	}

	public void setShomarePeyman(int shomarePeyman) {
		this.shomarePeyman = shomarePeyman;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getExecuter() {
		return executer;
	}
	public void setExecuter(String executer) {
		this.executer = executer;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getLunchTime() {
		return lunchTime;
	}
	public void setLunchTime(Date lunchTime) {
		this.lunchTime = lunchTime;
	}
	public String getLongtitute() {
		return longtitute;
	}
	public void setLongtitute(String longtitute) {
		this.longtitute = longtitute;
	}
	public String getLatitute() {
		return latitute;
	}
	public void setLatitute(String latitute) {
		this.latitute = latitute;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public YesOrNo getGathered() {
		return gathered;
	}
	public void setGathered(YesOrNo gathered) {
		this.gathered = gathered;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getGatheringDate() {
		return gatheringDate;
	}
	public void setGatheringDate(Date gatheringDate) {
		this.gatheringDate = gatheringDate;
	}
	public String getGatheringNotes() {
		return gatheringNotes;
	}
	public void setGatheringNotes(String gatheringNotes) {
		this.gatheringNotes = gatheringNotes;
	}
	public YesOrNo getLocked() {
		return locked;
	}
	public void setLocked(YesOrNo locked) {
		this.locked = locked;
	}
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(cascade=CascadeType.MERGE)
	@JoinTable(name = "equipment_flowstructure",
    joinColumns = {@JoinColumn(name = "equips_id", referencedColumnName = "id")}, 
    inverseJoinColumns = {@JoinColumn(name = "flows_id", referencedColumnName = "id")},
    uniqueConstraints={
			   @UniqueConstraint(columnNames={"flows_id", "equips_id"})})
	public List<FlowStructure> getFlows() {
		return flows;
	}

	public void setFlows(List<FlowStructure> flows) {
		this.flows = flows;
	}

	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="countryStructure_id",unique=false, nullable=true, insertable=true, updatable=true)
	public CountryStructure getCountryStructure() {
		return countryStructure;
	}

	public void setCountryStructure(CountryStructure countryStructure) {
		this.countryStructure = countryStructure;
	}

	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="type_id")
	public EquipmentType getEqType() {
		return eqType;
	}

	public void setEqType(EquipmentType eqType) {
		this.eqType = eqType;
	}

}
