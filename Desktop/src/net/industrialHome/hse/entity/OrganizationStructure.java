package net.industrialHome.hse.entity;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import net.industrialHome.hse.Enums.Alamak;
import net.industrialHome.hse.Enums.YesOrNo;

@JsonAutoDetect
@Entity
@Table(name="organizationStructure")
public class OrganizationStructure extends BaseEntity<Long>{
	
	private String name;
	private String stateCode;
	private String stateName;
	private int level;
	
	private YesOrNo confirmPlanning;
	private YesOrNo confirmDoneAcitivities;
	private YesOrNo confirmUserAcitivities;
	
	private YesOrNo referenceReadyToRun;
	private YesOrNo referenceAuto;

	private YesOrNo workEnterTime;
	private YesOrNo workDeclareEnough;
	private YesOrNo workMustEnterSubAct;
	private YesOrNo workMustEnterSubActPrice;
	private YesOrNo workMustEnterSubActTime;
	private YesOrNo workMustEnterEquipment;
	private YesOrNo workMustEnterPermitInfo;
	private YesOrNo workCanEnterInfoWP;
	
	private Alamak alamak;
	
	private int currentActDisplayInt;
	private int jobReferenceCounter;
	
	private OrganizationStructure parent;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return super.getId();
	}

	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getStateCode() {
		return stateCode;
	}


	public void setStateCode(String stateCode) {
		this.stateCode = stateCode;
	}


	public String getStateName() {
		return stateName;
	}


	public void setStateName(String stateName) {
		this.stateName = stateName;
	}


	public int getLevel() {
		return level;
	}


	public void setLevel(int level) {
		this.level = level;
	}


	public YesOrNo getConfirmPlanning() {
		return confirmPlanning;
	}


	public void setConfirmPlanning(YesOrNo confirmPlanning) {
		this.confirmPlanning = confirmPlanning;
	}


	public YesOrNo getConfirmDoneAcitivities() {
		return confirmDoneAcitivities;
	}


	public void setConfirmDoneAcitivities(YesOrNo confirmDoneAcitivities) {
		this.confirmDoneAcitivities = confirmDoneAcitivities;
	}


	public YesOrNo getConfirmUserAcitivities() {
		return confirmUserAcitivities;
	}


	public void setConfirmUserAcitivities(YesOrNo confirmUserAcitivities) {
		this.confirmUserAcitivities = confirmUserAcitivities;
	}


	public YesOrNo getReferenceReadyToRun() {
		return referenceReadyToRun;
	}


	public void setReferenceReadyToRun(YesOrNo referenceReadyToRun) {
		this.referenceReadyToRun = referenceReadyToRun;
	}


	public YesOrNo getReferenceAuto() {
		return referenceAuto;
	}


	public void setReferenceAuto(YesOrNo referenceAuto) {
		this.referenceAuto = referenceAuto;
	}


	public YesOrNo getWorkEnterTime() {
		return workEnterTime;
	}


	public void setWorkEnterTime(YesOrNo workEnterTime) {
		this.workEnterTime = workEnterTime;
	}


	public YesOrNo getWorkDeclareEnough() {
		return workDeclareEnough;
	}


	public void setWorkDeclareEnough(YesOrNo workDeclareEnough) {
		this.workDeclareEnough = workDeclareEnough;
	}


	public YesOrNo getWorkMustEnterSubAct() {
		return workMustEnterSubAct;
	}


	public void setWorkMustEnterSubAct(YesOrNo workMustEnterSubAct) {
		this.workMustEnterSubAct = workMustEnterSubAct;
	}


	public YesOrNo getWorkMustEnterSubActPrice() {
		return workMustEnterSubActPrice;
	}


	public void setWorkMustEnterSubActPrice(YesOrNo workMustEnterSubActPrice) {
		this.workMustEnterSubActPrice = workMustEnterSubActPrice;
	}


	public YesOrNo getWorkMustEnterSubActTime() {
		return workMustEnterSubActTime;
	}


	public void setWorkMustEnterSubActTime(YesOrNo workMustEnterSubActTime) {
		this.workMustEnterSubActTime = workMustEnterSubActTime;
	}


	public YesOrNo getWorkMustEnterEquipment() {
		return workMustEnterEquipment;
	}


	public void setWorkMustEnterEquipment(YesOrNo workMustEnterEquipment) {
		this.workMustEnterEquipment = workMustEnterEquipment;
	}


	public YesOrNo getWorkMustEnterPermitInfo() {
		return workMustEnterPermitInfo;
	}


	public void setWorkMustEnterPermitInfo(YesOrNo workMustEnterPermitInfo) {
		this.workMustEnterPermitInfo = workMustEnterPermitInfo;
	}


	public YesOrNo getWorkCanEnterInfoWP() {
		return workCanEnterInfoWP;
	}


	public void setWorkCanEnterInfoWP(YesOrNo workCanEnterInfoWP) {
		this.workCanEnterInfoWP = workCanEnterInfoWP;
	}


	public Alamak getAlamak() {
		return alamak;
	}


	public void setAlamak(Alamak alamak) {
		this.alamak = alamak;
	}


	public int getCurrentActDisplayInt() {
		return currentActDisplayInt;
	}


	public void setCurrentActDisplayInt(int currentActDisplayInt) {
		this.currentActDisplayInt = currentActDisplayInt;
	}


	public int getJobReferenceCounter() {
		return jobReferenceCounter;
	}


	public void setJobReferenceCounter(int jobReferenceCounter) {
		this.jobReferenceCounter = jobReferenceCounter;
	}

	@ManyToOne(optional=true)
	@JoinColumn(name="parent_id")
	public OrganizationStructure getParent() {
		return parent;
	}

	public void setParent(OrganizationStructure parent) {
		this.parent = parent;
	}
	
}
