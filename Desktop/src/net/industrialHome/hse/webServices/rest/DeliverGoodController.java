package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.DeliverGood;
import net.industrialHome.hse.service.DeliverGoodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class DeliverGoodController {
	private DeliverGoodService service;
	private GenericExtJsReturn<DeliverGood> extjsRet;
	

	public GenericExtJsReturn<DeliverGood> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<DeliverGood> extjsRet) {
		this.extjsRet = extjsRet;
	}


	public DeliverGoodService getService() {
		return service;
	}

	@Autowired
	public void setService(DeliverGoodService service) {
		this.service = service;
	}

	@RequestMapping(value="/DeliverGood/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<DeliverGood> DeliverGoods = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(DeliverGoods, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/DeliverGood/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<DeliverGood> data) throws Exception {

		try{

			List<DeliverGood> DeliverGoods = service.save(data.getData());

			return extjsRet.mapOK(DeliverGoods);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/DeliverGood/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<DeliverGood> data) throws Exception {
		try{

			List<DeliverGood> DeliverGoods = service.update(data.getData());

			return extjsRet.mapOK(DeliverGoods);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/DeliverGood/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<DeliverGood> data) throws Exception {
		try{
			
			List<DeliverGood> DeliverGoods = new ArrayList<DeliverGood>();
			for(DeliverGood DeliverGood:data){
				if(DeliverGood.getId() == null || DeliverGood.getId() == 0){
					DeliverGoods.addAll(0,service.save(DeliverGood));
				}else{
					DeliverGoods.addAll(service.update(DeliverGood));
				}
			}
			
			return extjsRet.mapOK(DeliverGoods);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/DeliverGood/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<DeliverGood> data) throws Exception {
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
