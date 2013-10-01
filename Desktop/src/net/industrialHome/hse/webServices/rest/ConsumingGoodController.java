package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.ConsumingGood;
import net.industrialHome.hse.service.ConsumingGoodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ConsumingGoodController {

	private ConsumingGoodService service;
	private GenericExtJsReturn<ConsumingGood> extjsRet;
	

	public GenericExtJsReturn<ConsumingGood> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<ConsumingGood> extjsRet) {
		this.extjsRet = extjsRet;
	}

	public ConsumingGoodService getService() {
		return service;
	}

	@Autowired
	public void setService(ConsumingGoodService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/consumingGood/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<ConsumingGood> consumigGoods = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(consumigGoods, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	@RequestMapping(value="/consumingGood/getByGroup.action")
	public @ResponseBody Map<String,? extends Object> searchByGroup(@RequestParam  Long id) throws Exception {
		
		try{
			
			List<ConsumingGood> consumigGoods = service.getGoodsByGroup(id);
			
			int total = consumigGoods.size();
			
			return extjsRet.mapOK(consumigGoods, total);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	@RequestMapping(value="/consumingGood/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<ConsumingGood> data) throws Exception {

		try{

			List<ConsumingGood> consumigGoods = service.save(data.getData());

			return extjsRet.mapOK(consumigGoods);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/consumingGood/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<ConsumingGood> data) throws Exception {
		try{

			List<ConsumingGood> consumigGoods = service.update(data.getData());

			return extjsRet.mapOK(consumigGoods);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/consumingGood/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<ConsumingGood> data) throws Exception {
		try{
			
			List<ConsumingGood> consumigGoods = new ArrayList<ConsumingGood>();
			for(ConsumingGood cosnumingGood:data){
				if(cosnumingGood.getId() == null || cosnumingGood.getId() == 0){
					consumigGoods.addAll(0,service.save(cosnumingGood));
				}else{
					consumigGoods.addAll(service.update(cosnumingGood));
				}
			}
			
			return extjsRet.mapOK(consumigGoods);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/consumingGood/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<ConsumingGood> data) throws Exception {
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
