package net.industrialHome.hse.webServices.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.industrialHome.hse.base.extSReturn.GenericExtJsReturn;
import net.industrialHome.hse.base.wrapper.GenericDataWrapper;
import net.industrialHome.hse.entity.Post;
import net.industrialHome.hse.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PostWSRest {

	private PostService service;
	private GenericExtJsReturn<Post> extjsRet;
	

	public GenericExtJsReturn<Post> getExtjsRet() {
		return extjsRet;
	}

	@Autowired
	public void setExtjsRet(GenericExtJsReturn<Post> extjsRet) {
		this.extjsRet = extjsRet;
//		this.extjsRet.setEntityClass(Post.class);
	}

	public PostService getService() {
		return service;
	}

	@Autowired
	public void setService(PostService service) {
		this.service = service;
	}

	
	@RequestMapping(value="/post/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam int start, @RequestParam int limit,@RequestParam (required = false) Object filter) throws Exception {

		try{

			List<Post> posts = service.getAll(start, limit, filter);
			
			int total = service.getTotal();

			return extjsRet.mapOK(posts, total);

		} catch (Exception e) {

			return extjsRet.mapError("Error retrieving posts from database.");
		}
	}
	
	@RequestMapping(value="/post/tree.action")
	public @ResponseBody Map<String,? extends Object> tree() throws Exception {
		
		try{
			
			List<Post> posts = service.getAll(0, 20,null);
			
			int total = service.getTotal();
			
			return extjsRet.mapOK(posts, total);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error retrieving posts from database.");
		}
	}
	
	@RequestMapping(value="/post/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody GenericDataWrapper<Post> data) throws Exception {
		try{
			List<Post> posts = new ArrayList<>();
			posts = service.save(data.getData());
//
			return extjsRet.mapOK(posts);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to create post.");
		}
	}
	
	@RequestMapping(value="/post/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody GenericDataWrapper<Post> data) throws Exception {
		try{

			List<Post> posts = service.update(data.getData());

			return extjsRet.mapOK(posts);

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/post/batchUpdate.action")
	public @ResponseBody Map<String,? extends Object> updateAll(@RequestBody List<Post> data) throws Exception {
		try{
			
			List<Post> posts = new ArrayList<Post>();
			for(Post post:data){
				if(post.getId() == null || post.getId() == 0){
					posts.addAll(0,service.save(post));
				}else{
					posts.addAll(service.update(post));
				}
			}
			
			return extjsRet.mapOK(posts);
			
		} catch (Exception e) {
			
			return extjsRet.mapError("Error trying to update post.");
		}
	}
	
	@RequestMapping(value="/post/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody GenericDataWrapper<Post> data) throws Exception {
		try{
			
			service.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return extjsRet.mapError("Error trying to delete post.");
		}
	}
	
	@RequestMapping(value="/post/getById.action")
	public @ResponseBody Post getById(@RequestParam Long id) throws Exception {
		
		try{
			
			
			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);
			Post dto = new Post();
			dto = service.getById(id);
			return dto;
			
		} catch (Exception e) {
			
			return null;
		}
	}
}
