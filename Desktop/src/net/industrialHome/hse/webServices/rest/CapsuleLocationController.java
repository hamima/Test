package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.CapsuleLocation;
import net.industrialHome.hse.service.CapsuleLocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CapsuleLocationController {

	private CapsuleLocationService capsuleLocationService;
	private GenericExtJsReturn<CapsuleLocation> extJSReturn;

	public CapsuleLocationService getCapsuleLocationService() {
		return capsuleLocationService;
	}

	@Autowired
	public void setCapsuleLocationService(
			CapsuleLocationService capsuleLocationService) {
		this.capsuleLocationService = capsuleLocationService;
	}

	public GenericExtJsReturn<CapsuleLocation> getExtJSReturn() {
		return extJSReturn;
	}
	
	@Autowired
	public void setExtJSReturn(GenericExtJsReturn<CapsuleLocation> extJSReturn) {
		this.extJSReturn = extJSReturn;
	}

	@RequestMapping(value = "/capsuleLocation/view.action")
	public @ResponseBody
	Map<String, ? extends Object> view(@RequestParam int start,
			@RequestParam int limit,
			@RequestParam(required = false) Object filter) throws Exception {

		try {

				List<CapsuleLocation> capsuleLocationDTOList = capsuleLocationService
									.getAll(start, limit,filter);

			int total = capsuleLocationService.getTotal();

			return extJSReturn.mapOK(capsuleLocationDTOList,
					total);

		} catch (Exception e) {

			return extJSReturn
					.mapError("Error retrieving users from database.");
		}
	}

	@RequestMapping(value = "/capsuleLocation/create.action")
	public @ResponseBody
	Map<String, ? extends Object> create(@RequestBody
			 GenericDataWrapper<CapsuleLocation> data) throws Exception {

		try {

			List<CapsuleLocation> capsuleLocationDTOList = capsuleLocationService.save(data.getData());
			return extJSReturn.mapOK(capsuleLocationDTOList);

		} catch (Exception e) {

			return extJSReturn
					.mapError("Error trying to create user.");
		}
	}

	@RequestMapping(value = "/capsuleLocation/update.action")
	public @ResponseBody
	Map<String, ? extends Object> update(
			@RequestBody GenericDataWrapper<CapsuleLocation> data) throws Exception {
		try {


			List<CapsuleLocation> capsuleLocationDTOList = capsuleLocationService
					.update(data.getData());

			return extJSReturn.mapOK(capsuleLocationDTOList);

		} catch (Exception e) {

			return extJSReturn
					.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value = "/capsuleLocation/batchUpdate.action")
	public @ResponseBody
	Map<String, ? extends Object> batchUpdate(
			@RequestBody List<CapsuleLocation> data) throws Exception {
		
		try {
			List<CapsuleLocation> capsuleLocationDTOList  = new ArrayList<CapsuleLocation>();
			for(CapsuleLocation location:data){
				if(location.getId() == 0 || location.getId() == null){
					capsuleLocationDTOList.addAll(0, capsuleLocationService
							.save(location));
				}else{
					capsuleLocationDTOList.addAll(capsuleLocationService
							.update(location));
				}
			}
			return extJSReturn.mapOK(capsuleLocationDTOList);
			
		} catch (Exception e) {
			
			return extJSReturn
					.mapError("Error trying to update user.");
		}
	}

	@RequestMapping(value = "/capsuleLocation/delete.action")
	public @ResponseBody
	Map<String, ? extends Object> delete(
			@RequestBody GenericDataWrapper<CapsuleLocation> data) throws Exception {

		try {

			capsuleLocationService.delete(data.getData());

			Map<String, Object> modelMap = new HashMap<String, Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extJSReturn
					.mapError("Error trying to delete user.");
		}
	}
	
	@RequestMapping(value="/capsuleLocation/getById.action")
	public @ResponseBody List<CapsuleLocation> getById(@RequestParam Long[] ids) throws Exception {
		
		try{
			List<CapsuleLocation> flows = new ArrayList<CapsuleLocation>();
			for(Long id:ids){
				CapsuleLocation dto = new CapsuleLocation();
				dto = capsuleLocationService.getById(id);
				flows.add(dto);
			}
			return flows;
		} catch (Exception e) {
			
			return null;
		}
	}
}
