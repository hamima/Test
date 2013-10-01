package net.industrialHome.hse.base.extSReturn;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.industrialHome.hse.entity.BaseEntity;


public class ExtJsReturnAPI<E extends BaseEntity<Long>> {
	
	/**
	 * Generates modelMap to return in the modelAndView
	 * @param contacts
	 * @return
	 */
//	
//	private Class<E> entityClass;
//	
//	
//	
//	public Class<E> getEntityClass() {
//		return entityClass;
//	}
//	public void setEntityClass(Class<E> entityClass) {
//		this.entityClass = entityClass;
//	}
	
	public ExtJsReturnAPI() {
		
	}
	public Map<String,Object> mapOK(List<E> entities){
		
		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", entities.size());
		modelMap.put("data", entities);
		modelMap.put("success", true);
		
		return modelMap;
	}
	
	/**
	 * Generates modelMap to return in the modelAndView
	 * @param contacts
	 * @return
	 */
	public Map<String,Object> mapOK(List<E> entities, int total){
		
		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", total);
		modelMap.put("data", entities);
		modelMap.put("success", true);
		
		return modelMap;
	}
	
	/**
	 * Generates modelMap to return in the modelAndView in case
	 * of exception
	 * @param msg message
	 * @return
	 */
	public Map<String,Object> mapError(String msg){

		Map<String,Object> modelMap = new HashMap<String,Object>(2);
		modelMap.put("message", msg);
		modelMap.put("success", false);

		return modelMap;
	}

}
