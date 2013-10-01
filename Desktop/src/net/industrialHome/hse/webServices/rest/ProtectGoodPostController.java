package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.PersonalInfo;
import net.industrialHome.hse.entity.ProtectGoodPost;
import net.industrialHome.hse.service.ProtectGoodPostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProtectGoodPostController {
	
	private ProtectGoodPostService service;
	private GenericExtJsReturn<ProtectGoodPost> extjsRet;
	

	public GenericExtJsReturn<ProtectGoodPost> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<ProtectGoodPost> extjsRet) {
		this.extjsRet = extjsRet;
//		this.extjsRet.setEntityClass(ProtectGoodPost.class);
	}

	public ProtectGoodPostService getService() {
		return service;
	}

	@Autowired
	public void setService(ProtectGoodPostService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/protectGoodsPost/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam(required=false) Object filter) throws Exception {

		try{

			List<ProtectGoodPost> ProtectGoodPosts = service.getAll(start, limit,filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(ProtectGoodPosts, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving consumigGoods from database.");
		}
	}
	
	
	@RequestMapping(value="/protectGoodsPost/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<ProtectGoodPost> data) throws Exception {

		try{

			List<ProtectGoodPost> ProtectGoodPosts = service.save(data.getData());

			return extjsRet.mapOK(ProtectGoodPosts);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create cosnumingGood.");
		}
	}
	@RequestMapping(value="/protectGoodsPost/viewProtects.action")
	public @ResponseBody Map<String,? extends Object> viewProtects(@RequestParam int start, @RequestParam int limit, @RequestParam(required=false) Long postId,@RequestParam(required=false) Object filter) throws Exception {
		
		try{
			List<ProtectGoodPost> protects = new ArrayList<ProtectGoodPost>();
			if(postId == null){
				protects = service.getAll(start, limit, filter);
			} else {
				protects = service.getAllProtectsByPost(start, limit, postId, filter);
			}
//			List<PersonalInfo> users = new ArrayList<PersonalInfo>();
//			users = service.getAllUsers(start, limit, filter);
			
			int total = service.getTotal();
			
			return extjsRet.mapOK(protects, total);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error retrieving users from database.");
		}
	}

	@RequestMapping(value="/protectGoodsPost/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<ProtectGoodPost> data) throws Exception {
		try{

			List<ProtectGoodPost> ProtectGoodPosts = service.update(data.getData());

			return extjsRet.mapOK(ProtectGoodPosts);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/protectGoodsPost/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<ProtectGoodPost> data) throws Exception {
		try{
			
			List<ProtectGoodPost> ProtectGoodPosts = new ArrayList<ProtectGoodPost>();
			for(ProtectGoodPost ProtectGoodPost:data){
				if(ProtectGoodPost.getId() == null || ProtectGoodPost.getId() == 0){
					ProtectGoodPosts.addAll(0,service.save(ProtectGoodPost));
				}else{
					ProtectGoodPosts.addAll(service.update(ProtectGoodPost));
				}
			}
			
			return extjsRet.mapOK(ProtectGoodPosts);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update cosnumingGood.");
		}
	}
	
	@RequestMapping(value="/protectGoodsPost/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<ProtectGoodPost> data) throws Exception {
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
