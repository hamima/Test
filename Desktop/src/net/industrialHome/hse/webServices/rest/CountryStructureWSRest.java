package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.CountryStructure;
import net.industrialHome.hse.service.CountryStructureService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CountryStructureWSRest {

	private CountryStructureService service;
	private GenericExtJsReturn<CountryStructure> extjsRet;
	
	
	@RequestMapping(value="/countryStructure/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<CountryStructure> coStructure = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(coStructure, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving posts from database.");
		}
	}
	
	@RequestMapping(value="/countryStructure/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<CountryStructure> data) throws Exception {

		try{

			List<CountryStructure> coStructure = service.save(data.getData());

			return extjsRet.mapOK(coStructure);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create post.");
		}
	}
	
	@RequestMapping(value="/countryStructure/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<CountryStructure> data) throws Exception {
		try{

			List<CountryStructure> coStructure = service.save(data.getData());

			return extjsRet.mapOK(coStructure);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update post.");
		}
	}
	@RequestMapping(value="/countryStructure/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody List<CountryStructure> data) throws Exception {
		try{
			List<CountryStructure> coStructure = new ArrayList<>();
			for(CountryStructure csDTO:data){
				if(csDTO.getId() == null || csDTO.getId() == 0){
					coStructure.addAll(0,service.save(csDTO));
					
				}else{
					coStructure.addAll(service.update(csDTO));
					
				}
			}
			
			return extjsRet.mapOK(coStructure);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/countryStructure/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<CountryStructure> data) throws Exception {
		
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete post.");
		}
	}
	
	@RequestMapping(value="/countryStructure/getById.action")
	public @ResponseBody List<CountryStructure> getById(@RequestParam Long[] ids) throws Exception {
		
		try{
			List<CountryStructure> flows = new ArrayList<CountryStructure>();
			for(Long id:ids){
				CountryStructure dto = new CountryStructure();
				dto = service.getById(id);
				flows.add(dto);
			}
			return flows;
		} catch (Exception e) {
			
			return null;
		}
	}
	
	public CountryStructureService getService() {
		return service;
	}
	
	@Autowired
	public void setService(CountryStructureService service) {
		this.service = service;
	}
	
	
	public GenericExtJsReturn<CountryStructure> getExtjsRet() {
		return extjsRet;
	}
	
	@Autowired
	public void setExtjsRet(GenericExtJsReturn<CountryStructure> extjsRet) {
		this.extjsRet = extjsRet;
	}

	
	
}
