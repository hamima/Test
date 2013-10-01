package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.Warehouse;
import net.industrialHome.hse.service.WarehouseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WarehouseController {

	private WarehouseService service;
	private GenericExtJsReturn<Warehouse> extjsRet;
	

	public GenericExtJsReturn<Warehouse> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<Warehouse> extjsRet) {
		this.extjsRet = extjsRet;
//		this.extjsRet.setEntityClass(Warehouse.class);
	}

	public WarehouseService getService() {
		return service;
	}

	@Autowired
	public void setService(WarehouseService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/warehouse/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<Warehouse> warehouses = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(warehouses, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/warehouse/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<Warehouse> data) throws Exception {

		try{

			List<Warehouse> warehouses = service.save(data.getData());

			return extjsRet.mapOK(warehouses);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/warehouse/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<Warehouse> data) throws Exception {
		try{

			List<Warehouse> warehouses = service.update(data.getData());

			return extjsRet.mapOK(warehouses);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/warehouse/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<Warehouse> data) throws Exception {
		try{
			
			List<Warehouse> warehouses = new ArrayList<Warehouse>();
			for(Warehouse warehouse:data){
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
	
	@RequestMapping(value="/Warehouse/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<Warehouse> data) throws Exception {
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
