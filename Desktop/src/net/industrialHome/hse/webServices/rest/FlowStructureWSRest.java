package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.FlowStructure;
import net.industrialHome.hse.service.FlowStructureService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FlowStructureWSRest {

	private FlowStructureService service;
	private GenericExtJsReturn<FlowStructure> extjsRet;
	
	
	@RequestMapping(value="/flow/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<FlowStructure> coStructure = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(coStructure, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving posts from database.");
		}
	}
	
	@RequestMapping(value="/flow/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<FlowStructure> data) throws Exception {

		try{

			List<FlowStructure> coStructure = service.save(data.getData());

			return extjsRet.mapOK(coStructure);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create post.");
		}
	}
	
	@RequestMapping(value="/flow/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<FlowStructure> data) throws Exception {
		try{

			List<FlowStructure> coStructure = service.update(data.getData());

			return extjsRet.mapOK(coStructure);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/flow/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> batchUpdate(@RequestBody List<FlowStructure> data) throws Exception {
		try{
			
			List<FlowStructure> coStructure = new ArrayList<FlowStructure>();
			for(FlowStructure flow:data){
				if(flow.getId() == null || flow.getId() == 0){
					coStructure.addAll(0, service.save(flow));
				}else{
					coStructure.addAll(service.update(flow));
					
				}
			}
			
			return extjsRet.mapOK(coStructure);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/flow/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<FlowStructure> data) throws Exception {
		
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete post.");
		}
	}
	
	@RequestMapping(value="/flow/getById.action")
	public @ResponseBody List<FlowStructure> getById(@RequestParam Long[] ids) throws Exception {
		
		try{
			List<FlowStructure> flows = new ArrayList<FlowStructure>();
			for(Long id:ids){
				FlowStructure dto = new FlowStructure();
				dto = service.getById(id);
				flows.add(dto);
			}
			return flows;
		} catch (Exception e) {
			
			return null;
		}
	}
	
	public FlowStructureService getService() {
		return service;
	}
	
	@Autowired
	public void setService(FlowStructureService service) {
		this.service = service;
	}

	public GenericExtJsReturn<FlowStructure> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<FlowStructure> extjsRet) {
		this.extjsRet = extjsRet;
	}
	
}
