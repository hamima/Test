package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.Capsule;
import net.industrialHome.hse.entity.EquipmentType;
import net.industrialHome.hse.service.EquipmentTypeService;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EquipmentTypeController {

	private EquipmentTypeService equipmentTypeService;
	private GenericExtJsReturn<EquipmentType> extJSReturn;
	
	public EquipmentTypeService getEquipmentTypeService() {
		return equipmentTypeService;
	}
	
	@Autowired
	public void setEquipmentTypeService(EquipmentTypeService equipmentTypeService) {
		this.equipmentTypeService = equipmentTypeService;
	}
	
	public GenericExtJsReturn<EquipmentType> getExtJSReturn() {
		return extJSReturn;
	}
	
	@Autowired
	public void setExtJSReturn(GenericExtJsReturn<EquipmentType> extJSReturn) {
		this.extJSReturn = extJSReturn;
	}
	
	@RequestMapping(value="/equipmentType/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) Object filter) throws Exception {

		try{

			List<EquipmentType> equipmentTypeList = equipmentTypeService.getAll(start, limit,filter);
			
			
			int total = equipmentTypeService.getTotal();

			return extJSReturn.mapOK(equipmentTypeList, total);

		} catch (Exception e) {

			return extJSReturn.mapError("Error retrieving users from database.");
		}
	}
	
	@RequestMapping(value="/equipmentType/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<EquipmentType> data) throws Exception {

		try{
			String defaults = data.getData().getDefaults();
			ObjectMapper mapper = new ObjectMapper();
			  try {
				  Capsule capsuleDTO = mapper.readValue(defaults.toString(), Capsule.class);
				  
				} catch (JsonParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (JsonMappingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
			List<EquipmentType> equipmentTypeList = equipmentTypeService.save(data.getData());

			return extJSReturn.mapOK(equipmentTypeList);

		} catch (Exception e) {

			return extJSReturn.mapError("Error trying to create user.");
		}
	}
	
	@RequestMapping(value="/equipmentType/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<EquipmentType> data) throws Exception {
		try{
			
			if(data.getData().getId() == 0 || data.getData().getId() == null){
				List<EquipmentType> equTypeDTOList = equipmentTypeService.save(data.getData());
			}
			
			List<EquipmentType> equTypeDTOList = equipmentTypeService.update(data.getData());

			return extJSReturn.mapOK(equTypeDTOList);

		} catch (Exception e) {

			return extJSReturn.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value="/equipmentType/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> batchUpdate(@RequestBody List<EquipmentType> data) throws Exception {
		try{
			List<EquipmentType> equTypeDTOList = new ArrayList<EquipmentType>();
			
			for(EquipmentType equipType:data){
				
				if(equipType.getId() == 0 || equipType.getId() == null){
					equTypeDTOList.addAll(0,equipmentTypeService.save(equipType));
				}else{
					
					equTypeDTOList.addAll(equipmentTypeService.update(equipType));
				}
			}
			
			return extJSReturn.mapOK(equTypeDTOList);
			
		} catch (Exception e) {
			
			return extJSReturn.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value="/equipmentType/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<EquipmentType> data) throws Exception {
		
		try{
			
			equipmentTypeService.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extJSReturn.mapError("Error trying to delete user.");
		}
	}
	
	@RequestMapping(value="/equipmentType/getById.action")
	public @ResponseBody List<EquipmentType> getById(@RequestParam Long[] ids) throws Exception {
		
		try{
			List<EquipmentType> flows = new ArrayList<EquipmentType>();
			for(Long id:ids){
				EquipmentType dto = new EquipmentType();
				dto = equipmentTypeService.getById(id);
				flows.add(dto);
			}
			return flows;
		} catch (Exception e) {
			
			return null;
		}
	}
}
