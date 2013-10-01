package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.PersonalInfo;
import net.industrialHome.hse.service.PersonalInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PersonalInfoWSRest {

	private PersonalInfoService service;
	private GenericExtJsReturn<PersonalInfo> extjsRet;
	
	
	public GenericExtJsReturn<PersonalInfo> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<PersonalInfo> extjsRet) {
		this.extjsRet = extjsRet;
	}

	public PersonalInfoService getService() {
		return service;
	}

	@Autowired
	public void setService(PersonalInfoService service) {
		this.service = service;
	}
	
	@RequestMapping(value="/personalInfo/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) String query,@RequestParam(required=false) Object filter) throws Exception {

		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			
			if(query != null){
				byte[] str = query.getBytes();
				query = new String(str,"UTF-8");
			}
			if(query != null){
				users = service.search(start, limit, query);
				
			}else{
				users = service.getAll(start, limit, filter);
			}
			
			int total = users.size();

			return extjsRet.mapOK(users, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving users from database.");
		}
		
	}
	
	@RequestMapping(value="/personalInfo/searchByName.action")
	public @ResponseBody Map<String,? extends Object> searchByName(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) String query) throws Exception {

		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			
			if(query != null){
				byte[] str = query.getBytes();
				query = new String(str,"UTF-8");
			}
			users = service.search(start, limit, query);
			int total = users.size();

			return extjsRet.mapOK(users, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving users from database.");
		}
		
	}
	
	@RequestMapping(value="/personalInfo/search.action")
	public @ResponseBody Map<String,? extends Object> search(@RequestParam int start, @RequestParam int limit, @RequestParam String query) throws Exception {
		
		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			users = service.search(start, limit, query);
			
			int total = users.size();
			
			return extjsRet.mapOK(users, total);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error retrieving users from database.");
		}
	}
	
	@RequestMapping(value="/personalInfo/viewHse.action")
	public @ResponseBody Map<String,? extends Object> viewHse(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) String query,@RequestParam(required=false) Object filter) throws Exception {

		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			users = service.getAllHSEs(start, limit, filter);
			
			int total = service.getHSETotal();

			return extjsRet.mapOK(users, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving users from database.");
		}
	}
	@RequestMapping(value="/personalInfo/checkUserName.action")
	public @ResponseBody String usernameCheck(@RequestParam String username) throws Exception {
		
		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			users = service.getPersonalsByUserName(username);
			String userNumber;
			if(users.size() > 0)
			{
				userNumber = "1";
			}else{
				userNumber = "0";
			}
			
			return userNumber;
			
		} catch (Exception e) {
			
			return "nothing";
		}
	}
	@RequestMapping(value="/personalInfo/checkNationalCode.action")
	public @ResponseBody String nationalCodeCheck(@RequestParam String nationalCode) throws Exception {
		
		try{
				List<PersonalInfo> users = new ArrayList<PersonalInfo>();
				users = service.getPersonalsByNationalCode(nationalCode);
				String nationalcode;
				if(users.size() > 0)
				{
					nationalcode = "1";
				}else{
					nationalcode = "0";
				}
				
				return nationalcode;
				
		} catch (Exception e) {
			
			return "nothing";
		}
			
	}
	@RequestMapping(value="/personalInfo/viewUsers.action")
	public @ResponseBody Map<String,? extends Object> viewUsers(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) String query,@RequestParam(required=false) Object filter) throws Exception {
		
		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			users = service.getAllUsers(start, limit, filter);
			
			int total = service.getUserTotal();
			
			return extjsRet.mapOK(users, total);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error retrieving users from database.");
		}
	}
	
	@RequestMapping(value="/personalInfo/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<PersonalInfo> data) throws Exception {

		try{

			List<PersonalInfo> users = service.save(data.getData());

			return extjsRet.mapOK(users);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create user.");
		}
	}
	
	@RequestMapping(value="/personalInfo/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<PersonalInfo> data) throws Exception {
		try{
			
			if(data.getData().getId() == 0 || data.getData().getId() == null){
				List<PersonalInfo> users = service.save(data.getData());
			}
			
			List<PersonalInfo> users = service.update(data.getData());

			return extjsRet.mapOK(users);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value="/personalInfo/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> batchUpdate(@RequestBody List<PersonalInfo> persons) throws Exception {
		try{
			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
			for(PersonalInfo person:persons){
				if(person.getId() == 0 || person.getId() == null){
					users.addAll(0,service.save(person));
				}else{
					users.addAll(service.update(person));
				}
			}
			return extjsRet.mapOK(users);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update user.");
		}
	}
	
	@RequestMapping(value="/personalInfo/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<PersonalInfo> data) throws Exception {
		
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete user.");
		}
	}
	
	@RequestMapping(value="/personalInfo/getById.action")
	public @ResponseBody PersonalInfo getById(@RequestParam Long id) throws Exception {
		
		try{
			
			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);
			PersonalInfo dto = new PersonalInfo();
			dto = service.getById(id);
			return dto;
			
		} catch (Exception e) {
			
			return new PersonalInfo();
		}
	}
	
}
