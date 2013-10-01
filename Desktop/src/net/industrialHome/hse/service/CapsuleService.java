package net.industrialHome.hse.service;

import java.util.ArrayList;
import java.util.List;

import net.industrialHome.hse.base.dao.GenericHibernateDao;
import net.industrialHome.hse.base.service.BaseService;
import net.industrialHome.hse.entity.Capsule;
import net.industrialHome.hse.entity.EquipmentType;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class CapsuleService extends BaseService<Capsule>{
	
	
	private GenericHibernateDao<EquipmentType> equipTypeDAO;
	
	
	

	public GenericHibernateDao<EquipmentType> getEquipTypeDAO() {
		return equipTypeDAO;
	}

	@Autowired
	public void setEquipTypeDAO(
			GenericHibernateDao<EquipmentType> equipTypeDAO) {
		this.equipTypeDAO = equipTypeDAO;
		this.equipTypeDAO.setClazz(EquipmentType.class);
	}

	public List<Capsule> saveAll(Long equipTypeId, int number) {
		List<Capsule> capsules = new ArrayList<Capsule>();
		EquipmentType eqTypeEntity = equipTypeDAO.getById(equipTypeId);
		ObjectMapper mapperDTO = new ObjectMapper();
		Capsule capsuleDTO = null;
		try {
			  capsuleDTO = mapperDTO.readValue(eqTypeEntity.getDefaults().toString(), Capsule.class);
			  capsuleDTO.setId(null);
			  EquipmentType eqType = new EquipmentType();
			  eqType.setId(equipTypeId);
			  capsuleDTO.setEqType(eqType);
			  
			} catch (Exception e) {
				e.printStackTrace();
			}
		for(int i=1;i<number;i++){
			
			Capsule entity =  getDao().save(capsuleDTO);
			capsules.add(entity);
		} 
		eqTypeEntity.setNum(eqTypeEntity.getNum() + number);
		equipTypeDAO.update(eqTypeEntity);
		return capsules;
	}
	
}
