package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.OrganizationStructure;
import net.industrialHome.hse.service.OrganizationStructureService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OrganizationStructureWSRest {

	private OrganizationStructureService service;
	private GenericExtJsReturn<OrganizationStructure> extjsRet;
	

	public OrganizationStructureService getService() {
		return service;
	}

	@Autowired
	public void setService(OrganizationStructureService service) {
		this.service = service;
	}

	public GenericExtJsReturn<OrganizationStructure> getExtjsRet() {
		return extjsRet;
	}
	
	@Autowired
	public void setExtjsRet(GenericExtJsReturn<OrganizationStructure> extjsRet) {
		this.extjsRet = extjsRet;
	}

	@RequestMapping(value="/organ/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<OrganizationStructure> posts = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(posts, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving posts from database.");
		}
	}
	
	@RequestMapping(value="/organ/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<OrganizationStructure> data) throws Exception {

		try{

			List<OrganizationStructure> organs = service.save(data.getData());

			return extjsRet.mapOK(organs);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create post.");
		}
	}
	
	
	@RequestMapping(value="/organ/update.action")
	public @ResponseBody Map<String,? extends Object> batchUpdate(@RequestBody GenericDataWrapper<OrganizationStructure> data) throws Exception {
		try{
			
			List<OrganizationStructure> organs = service.update(data.getData());
			
			return extjsRet.mapOK(organs);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/organ/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody List<OrganizationStructure> data) throws Exception {
		try{
			List<OrganizationStructure> organs = new ArrayList<OrganizationStructure>();
			for(OrganizationStructure organ:data){
				if(organ.getId() == null || organ.getId() == 0){
					organs.addAll(0,service.save(organ));
				}else{
					organs.addAll(service.update(organ));
				}
			}
			return extjsRet.mapOK(organs);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/organ/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<OrganizationStructure> data) throws Exception {
		
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete post.");
		}
	}
	
	@RequestMapping(value="/organ/getById.action")
	public @ResponseBody List<OrganizationStructure> getById(@RequestParam Long[] ids) throws Exception {
		
		try{
			List<OrganizationStructure> organs = new ArrayList<OrganizationStructure>();
			for(Long id:ids){
				OrganizationStructure dto = new OrganizationStructure();
				dto = service.getById(id);
				organs.add(dto);
			}
			return organs;
		} catch (Exception e) {
			
			return null;
		}
	}
	
}
