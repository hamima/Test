package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.Capsule;
import net.industrialHome.hse.entity.EquipmentType;
import net.industrialHome.hse.service.CapsuleService;
import net.industrialHome.hse.service.EquipmentTypeService;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CapsuleController {
	
	private CapsuleService capsuleService;
	private EquipmentTypeService eqtypeService;
	private GenericExtJsReturn<Capsule> capsuleExtJSReturn;
	
	public EquipmentTypeService getEqtypeService() {
		return eqtypeService;
	}

	@Autowired
	public void setEqtypeService(EquipmentTypeService eqtypeService) {
		this.eqtypeService = eqtypeService;
	}

	public CapsuleService getCapsuleService() {
		return capsuleService;
	}
	
	@Autowired
	public void setCapsuleService(CapsuleService capsuleService) {
		this.capsuleService = capsuleService;
	}
	
	
	public GenericExtJsReturn<Capsule> getCapsuleExtJSReturn() {
		return capsuleExtJSReturn;
	}

	@Autowired
	public void setCapsuleExtJSReturn(
			GenericExtJsReturn<Capsule> capsuleExtJSReturn) {
		this.capsuleExtJSReturn = capsuleExtJSReturn;
	}

	@RequestMapping(value="/capsule/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) Object filter) throws Exception {

		try{

			List<Capsule> capsuleDTOList = capsuleService.getAll(start, limit,filter);
			
			int total = capsuleService.getTotal();

			return capsuleExtJSReturn.mapOK(capsuleDTOList, total);

		} catch (Exception e) {

			return capsuleExtJSReturn.mapError("Error retrieving users from database.");
		}
	}
	
	@RequestMapping(value="/capsule/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<Capsule> data) throws Exception {

		try{

			List<Capsule> capsuleDTOList = capsuleService.save(data.getData());

			return capsuleExtJSReturn.mapOK(capsuleDTOList);

		} catch (Exception e) {

			return capsuleExtJSReturn.mapError("Error trying to create user.");
		}
	}
	
	@RequestMapping(value="/capsule/batchCreate.action")
	public @ResponseBody Map<String,? extends Object> batchCreate(@RequestParam List<String> num) throws Exception {
		
		try{
			System.out.println(num);
			List<Capsule> capsules = new ArrayList<Capsule>();
			EquipmentType eqTypeEntity = eqtypeService.getById(Long.parseLong(num.get(0)));
			ObjectMapper mapperDTO = new ObjectMapper();
			Capsule capsuleDTO = null;
			try {
				  capsuleDTO = mapperDTO.readValue(eqTypeEntity.getDefaults().toString(), Capsule.class);
				  /*EquipmentTypeDTO eqType = new EquipmentTypeDTO();
				  eqType.setId(equipTypeId);*/
				  capsuleDTO.setEqType(eqTypeEntity);
				  
				} catch (Exception e) {
					e.printStackTrace();
				}
			for(int i=0;i<Integer.parseInt(num.get(1));i++){
				capsules.addAll(0,capsuleService.save(capsuleDTO));
			} 
			eqTypeEntity.setNum(eqTypeEntity.getNum() + Integer.parseInt(num.get(1)));
			eqtypeService.update(eqTypeEntity);
			return capsuleExtJSReturn.mapOK(capsules);
			
		} catch (Exception e) {
			
			return capsuleExtJSReturn.mapError("Error trying to create user.");
		}
	}

	@RequestMapping(value="/capsule/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<Capsule> data) throws Exception {
		try{
			List<Capsule> capsuleDTOList = new ArrayList<Capsule>();
			if(data.getData().getId() == 0 || data.getData().getId() == null){
				 capsuleDTOList = capsuleService.save(data.getData());
			}
			
			capsuleDTOList = capsuleService.update(data.getData());

			return capsuleExtJSReturn.mapOK(capsuleDTOList);

		} catch (Exception e) {

			return capsuleExtJSReturn.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value="/capsule/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> batchUpdate(@RequestBody List<Capsule> capsules) throws Exception {
		try{
			List<Capsule> capsuleDTOList = new ArrayList<Capsule>();
			for(Capsule capsule:capsules){
				if(capsule.getId() == null || capsule.getId() == 0){
					capsuleDTOList.addAll(0,capsuleService.save(capsule));
				}else{
					capsuleDTOList.addAll(capsuleService.save(capsule));
					
				}
			}
			return capsuleExtJSReturn.mapOK(capsuleDTOList);
			
		} catch (Exception e) {
			
			return capsuleExtJSReturn.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value="/capsule/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<Capsule> data) throws Exception {
		
		try{
			
			capsuleService.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return capsuleExtJSReturn.mapError("Error trying to delete user.");
		}
	}
}
