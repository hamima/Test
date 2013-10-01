package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.ProtectGoodPerson;
import net.industrialHome.hse.service.ProtectGoodPersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProtectGoodPersonController {

	private ProtectGoodPersonService service;
	private GenericExtJsReturn<ProtectGoodPerson> extjsRet;
	

	public GenericExtJsReturn<ProtectGoodPerson> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<ProtectGoodPerson> extjsRet) {
		this.extjsRet = extjsRet;
//		this.extjsRet.setEntityClass(ProtectGoodPerson.class);
	}

	public ProtectGoodPersonService getService() {
		return service;
	}

	@Autowired
	public void setService(ProtectGoodPersonService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/protectGoodsPerson/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<ProtectGoodPerson> ProtectGoodPersons = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(ProtectGoodPersons, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/protectGoodsPerson/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<ProtectGoodPerson> data) throws Exception {

		try{

			List<ProtectGoodPerson> ProtectGoodPersons = service.save(data.getData());

			return extjsRet.mapOK(ProtectGoodPersons);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/protectGoodsPerson/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<ProtectGoodPerson> data) throws Exception {
		try{

			List<ProtectGoodPerson> ProtectGoodPersons = service.update(data.getData());

			return extjsRet.mapOK(ProtectGoodPersons);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/protectGoodsPerson/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<ProtectGoodPerson> data) throws Exception {
		try{
			
			List<ProtectGoodPerson> ProtectGoodPersons = new ArrayList<ProtectGoodPerson>();
			for(ProtectGoodPerson ProtectGoodPerson:data){
				if(ProtectGoodPerson.getId() == null || ProtectGoodPerson.getId() == 0){
					ProtectGoodPersons.addAll(0,service.save(ProtectGoodPerson));
				}else{
					ProtectGoodPersons.addAll(service.update(ProtectGoodPerson));
				}
			}
			
			return extjsRet.mapOK(ProtectGoodPersons);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/protectGoodsPerson/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<ProtectGoodPerson> data) throws Exception {
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete cosnumingGood.");
		}
	}
	
}
