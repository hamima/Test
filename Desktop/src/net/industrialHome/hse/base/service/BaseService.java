package net.industrialHome.hse.base.service;

import java.lang.reflect.ParameterizedType;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import net.industrialHome.hse.base.dao.GenericHibernateDao;
import net.industrialHome.hse.entity.BaseEntity;
import net.industrialHome.hse.util.ExtJSFilter;
import net.industrialHome.hse.util.HibernateUtil;
import net.industrialHome.hse.util.JsonUtil;

import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class BaseService<E extends BaseEntity<Long>> implements IBaseService<E>{

	private Class<E> clazz;
	private GenericHibernateDao<E> dao;
	
	private HibernateUtil<E> hibernateUtil;
	
	private JsonUtil jsonUtil;
	
	@SuppressWarnings("unchecked")
	public BaseService() {
		if (getClass().getGenericSuperclass() instanceof ParameterizedType) {
			ParameterizedType genericSuperclass = (ParameterizedType) getClass()
					.getGenericSuperclass();
			if (genericSuperclass != null
					&& genericSuperclass.getActualTypeArguments() != null
					&& genericSuperclass.getActualTypeArguments().length > 0) {
				if (genericSuperclass.getActualTypeArguments()[0] instanceof Class) {
					clazz = (Class<E>) genericSuperclass
							.getActualTypeArguments()[0];
				}
			}
		}
	}
	
	@Autowired
	public void setJsonUtil(JsonUtil jsonUtil) {
		this.jsonUtil = jsonUtil;
	}
	
	public JsonUtil getJsonUtil() {
		return jsonUtil;
	}

	public Class<E> getClazz() {
		return clazz;
	}

	public void setClazz(Class<E> clazz) {
		this.clazz = clazz;
	}

	public GenericHibernateDao<E> getDao() {
		return dao;
	}

	@Autowired
	public void setDao(GenericHibernateDao<E> dao) {
		this.dao = dao;
		this.dao.setClazz(clazz);
	}

	public HibernateUtil<E> getHibernateUtil() {
		return hibernateUtil;
	}

	@Autowired
	public void setHibernateUtil(HibernateUtil<E> hibernateUtil) {
		this.hibernateUtil = hibernateUtil;
		this.hibernateUtil.setClazz(clazz);
	}
	
	public List<Criterion> getHibernateCriteriaList(List<ExtJSFilter> filters){
		
		List<Criterion> restrictions = new ArrayList<Criterion>();
		
		if (filters != null){ //filters is optional
			
			try {
				restrictions = hibernateUtil.getRestrictions(filters);
			} catch (SecurityException | NoSuchFieldException | ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return restrictions;
	}

	@Override
	public List<E> getAll(int start, int limit, Object filter) {
		List<E> entities = new ArrayList<E>();
		List<ExtJSFilter> filters = null;
		
		if (filter != null){ 
			filters = getJsonUtil().getExtJSFiltersFromRequest(filter);
		}
		
		List<Criterion> restrictions = getHibernateCriteriaList(filters);
		dao.setRestrictions(restrictions);
		entities = dao.getAll(start, limit, restrictions);
		return entities;
	}

	@Override
	public List<E> save(E entity) {
		List<E> entities = new ArrayList<E>();
		entity.setId(null);
		E en = dao.save(entity);
		entities.add(en);
		return entities;
	}

	@Override
	public List<E> update(E entity) {
		List<E> entities = new ArrayList<E>();
		E en = dao.update(entity);
		entities.add(en);
		return entities;
	}

	@Override
	public void delete(E entity) {
		dao.delete(entity);
	}

	@Override
	public int getTotal() {
		
		return dao.getTotal();
	}

	@Override
	public E getById(Long id) {
		return dao.getById(id);
	}
	
	public List<E > getAllUsers(int start,int limit,Object filter){
		List<ExtJSFilter> filters = null;
		
		if (filter != null){ 
			filters = getJsonUtil().getExtJSFiltersFromRequest(filter);
		}
		
		List<Criterion> restrictions = getHibernateCriteriaList(filters);
		dao.setRestrictions(restrictions);
		List<E> entities = dao.getUsers(start, limit, restrictions);
		
		return entities;
	}
	
	public List<E> getAllHSEs(int start,int limit,Object filter){
		List<ExtJSFilter> filters = null;
		
		if (filter != null) { 
			filters = getJsonUtil().getExtJSFiltersFromRequest(filter);
		}
		
		List<Criterion> restrictions = getHibernateCriteriaList(filters);
		dao.setRestrictions(restrictions);
		List<E> entities = dao.getHSE(start, limit, restrictions);
		return entities;
	}
	
	public int getUserTotal(){
		return dao.totalUserNum();
	}
	
	public int getHSETotal(){
		return dao.totalHSENum();
	}

}
