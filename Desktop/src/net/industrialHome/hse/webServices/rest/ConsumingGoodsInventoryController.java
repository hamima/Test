package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.ConsumingGoodsInventory;
import net.industrialHome.hse.service.ConsumingGoodsInventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ConsumingGoodsInventoryController {
	
	private ConsumingGoodsInventoryService service;
	private GenericExtJsReturn<ConsumingGoodsInventory> extjsRet;
	

	public GenericExtJsReturn<ConsumingGoodsInventory> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<ConsumingGoodsInventory> extjsRet) {
		this.extjsRet = extjsRet;
//		this.extjsRet.setEntityClass(ConsumingGoodsInventory.class);
	}

	public ConsumingGoodsInventoryService getService() {
		return service;
	}

	@Autowired
	public void setService(ConsumingGoodsInventoryService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/ConsumingGoodsInventory/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<ConsumingGoodsInventory> warehouses = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(warehouses, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/ConsumingGoodsInventory/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<ConsumingGoodsInventory> data) throws Exception {

		try{

			List<ConsumingGoodsInventory> warehouses = service.save(data.getData());

			return extjsRet.mapOK(warehouses);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/ConsumingGoodsInventory/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<ConsumingGoodsInventory> data) throws Exception {
		try{

			List<ConsumingGoodsInventory> warehouses = service.update(data.getData());

			return extjsRet.mapOK(warehouses);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/ConsumingGoodsInventory/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<ConsumingGoodsInventory> data) throws Exception {
		try{
			
			List<ConsumingGoodsInventory> warehouses = new ArrayList<ConsumingGoodsInventory>();
			for(ConsumingGoodsInventory warehouse:data){
				if(warehouse.getId() == null || warehouse.getId() == 0){
					warehouses.addAll(0,service.save(warehouse));
				}else{
					warehouses.addAll(service.update(warehouse));
				}
			}
			
			return extjsRet.mapOK(warehouses);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/ConsumingGoodsInventory/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<ConsumingGoodsInventory> data) throws Exception {
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
