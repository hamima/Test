package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.InventoryLog;
import net.industrialHome.hse.service.InventoryLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class InventoryLogController {
	
	private InventoryLogService service;
	private GenericExtJsReturn<InventoryLog> extjsRet;
	

	public GenericExtJsReturn<InventoryLog> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<InventoryLog> extjsRet) {
		this.extjsRet = extjsRet;
	}

	public InventoryLogService getService() {
		return service;
	}

	@Autowired
	public void setService(InventoryLogService service) {
		this.service = service;
	}

	@RequestMapping(value="/InventoryLog/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<InventoryLog> InventoryLogs = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(InventoryLogs, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/InventoryLog/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<InventoryLog> data) throws Exception {

		try{

			List<InventoryLog> InventoryLogs = service.save(data.getData());

			return extjsRet.mapOK(InventoryLogs);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/InventoryLog/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<InventoryLog> data) throws Exception {
		try{

			List<InventoryLog> InventoryLogs = service.update(data.getData());

			return extjsRet.mapOK(InventoryLogs);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/InventoryLog/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<InventoryLog> data) throws Exception {
		try{
			
			List<InventoryLog> InventoryLogs = new ArrayList<InventoryLog>();
			for(InventoryLog InventoryLog:data){
				if(InventoryLog.getId() == null || InventoryLog.getId() == 0){
					InventoryLogs.addAll(0,service.save(InventoryLog));
				}else{
					InventoryLogs.addAll(service.update(InventoryLog));
				}
			}
			
			return extjsRet.mapOK(InventoryLogs);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/InventoryLog/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<InventoryLog> data) throws Exception {
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
