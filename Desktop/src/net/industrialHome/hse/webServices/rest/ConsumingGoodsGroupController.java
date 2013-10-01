package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.Enums.Rasteh;
import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.ConsumingGoodsGroup;
import net.industrialHome.hse.service.ConsumingGoodsGroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ConsumingGoodsGroupController {

	private ConsumingGoodsGroupService service;
	private GenericExtJsReturn<ConsumingGoodsGroup> extjsRet;
	

	public GenericExtJsReturn<ConsumingGoodsGroup> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<ConsumingGoodsGroup> extjsRet) {
		this.extjsRet = extjsRet;
//		this.extjsRet.setEntityClass(ConsumingGoodsGroup.class);
	}

	public ConsumingGoodsGroupService getService() {
		return service;
	}

	@Autowired
	public void setService(ConsumingGoodsGroupService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/cosnumingGoodsGroup/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter, @RequestParam(required=false) String HSETrue) throws Exception {

		try{

			List<ConsumingGoodsGroup> consumigGoods = service.getAll(start, limit,filter);
			
			if (HSETrue.equals("YES")) {
				for (ConsumingGoodsGroup consumingGoodsGroup: consumigGoods) {
					if (consumingGoodsGroup.getRasteh() != Rasteh.PERSONALPROTECTION) {
						consumigGoods.remove(consumingGoodsGroup);
					}
				}
			}
			
			int total = service.getTotal();

			return extjsRet.mapOK(consumigGoods, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/cosnumingGoodsGroup/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<ConsumingGoodsGroup> data) throws Exception {

		try{

			List<ConsumingGoodsGroup> consumigGoods = service.save(data.getData());

			return extjsRet.mapOK(consumigGoods);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGoodsGroup.");
		}
	}
	
	@RequestMapping(value="/cosnumingGoodsGroup/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<ConsumingGoodsGroup> data) throws Exception {
		try{

			List<ConsumingGoodsGroup> consumigGoods = service.update(data.getData());

			return extjsRet.mapOK(consumigGoods);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGoodsGroup.");
		}
	}
	
	@RequestMapping(value="/cosnumingGoodsGroup/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<ConsumingGoodsGroup> data) throws Exception {
		try{
			
			List<ConsumingGoodsGroup> consumigGoods = new ArrayList<ConsumingGoodsGroup>();
			for(ConsumingGoodsGroup cosnumingGoodsGroup:data){
				if(cosnumingGoodsGroup.getId() == null || cosnumingGoodsGroup.getId() == 0){
					consumigGoods.addAll(0,service.save(cosnumingGoodsGroup));
				}else{
					consumigGoods.addAll(service.update(cosnumingGoodsGroup));
				}
			}
			
			return extjsRet.mapOK(consumigGoods);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGoodsGroup.");
		}
	}
	
	@RequestMapping(value="/cosnumingGoodsGroup/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<ConsumingGoodsGroup> data) throws Exception {
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete cosnumingGoodsGroups.");
		}
	}
}
