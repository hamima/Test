package net.industrialHome.hse.base.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.orm.hibernate3.HibernateTemplate;



@SuppressWarnings(value = "unchecked")
public abstract class BaseDAO<E> implements IGenericDAO<E>{

	private Class<E> clazz;
	private List<Criterion> restrictions;
	
	
	
	public List<Criterion> getRestrictions() {
		return restrictions;
	}

	public void setRestrictions(List<Criterion> restrictions) {
		this.restrictions = restrictions;
	}

	public Class<E> getClazz() {
		return clazz;
	}

	public void setClazz(final Class<E> clazz) {
		this.clazz = clazz;
	}

	private HibernateTemplate hibernateTemplate;
	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
		this.sessionFactory = sessionFactory;
	}

	protected Session getCurrentSession(){
		return sessionFactory.getCurrentSession();
	}
	 
	public E save(E e){
		getCurrentSession().save(e);
		return e;
	}
	public E update(E e){
		hibernateTemplate.update(e);
		return e;
	}

	public void delete(E e){
		hibernateTemplate.delete(e);
	}
	
	public int totalNum(){
		DetachedCriteria criteria = DetachedCriteria.forClass(clazz);
		return hibernateTemplate.findByCriteria(criteria).size();
	}
	public int totalUserNum(){
		DetachedCriteria criteria = getHibernateCriteria(restrictions);
		Criterion cr2 = Restrictions.isNotNull("userName");
		Criterion cr1 = Restrictions.ilike("userName", "");
		criteria.add(cr2);
		criteria.add(Restrictions.not(cr1));
		return hibernateTemplate.findByCriteria(criteria).size();
	}
	public int totalHSENum(){
		DetachedCriteria criteria = getHibernateCriteria(restrictions);
		Criterion cr2 = Restrictions.isNotNull("personelCode");
		Criterion cr3 = Restrictions.ilike("personelCode", "");
		criteria.add(cr2);
		criteria.add(Restrictions.not(cr3));
		return hibernateTemplate.findByCriteria(criteria).size();
	}
	
	public List<E> getAll(int start, int limit, List<Criterion> restrictions){
		DetachedCriteria criteria = getHibernateCriteria(restrictions);
		return hibernateTemplate.findByCriteria(criteria, start, limit);
	}
	
	public List<E> getUsers(int start, int limit,List<Criterion> restrictions){
		DetachedCriteria criteria = getHibernateCriteria(restrictions);
		Criterion cr2 = Restrictions.isNotNull("userName");
		Criterion cr1 = Restrictions.ilike("userName", "");
		criteria.add(cr2);
		criteria.add(Restrictions.not(cr1));
		return hibernateTemplate.findByCriteria(criteria, start, limit);
	}
	
	public List<E> getHSE(int start, int limit,List<Criterion> restrictions){
		DetachedCriteria criteria = getHibernateCriteria(restrictions);
		Criterion cr2 = Restrictions.isNotNull("personelCode");
		Criterion cr3 = Restrictions.ilike("personelCode", "");
		criteria.add(cr2);
		criteria.add(Restrictions.not(cr3));
		return hibernateTemplate.findByCriteria(criteria, start, limit);
	}
	
	public List<E> searchByName(int start, int limit, String[] name){
		DetachedCriteria criteria = DetachedCriteria.forClass(clazz);
		if(name.length > 1){
			Criterion criterion = Restrictions.like("firstName", "%"+name[0]+"%");
			Criterion criterion2 = Restrictions.like("lastName", "%"+name[1]+"%");
			criteria.add(criterion);
			criteria.add(criterion2);
		}else
		{
			Criterion criterion = Restrictions.like("firstName", "%"+name[0]+"%");
			Criterion criterion2 = Restrictions.like("lastName", "%"+name[0]+"%");
			criteria.add(Restrictions.or(criterion, criterion2));
		}
		return hibernateTemplate.findByCriteria(criteria, start, limit);
	}
	
	public E getById(Long id){
		DetachedCriteria criteria = DetachedCriteria.forClass(clazz);
		Criterion cr = Restrictions.eq("id", id);
		criteria.add(cr);
		return (E) hibernateTemplate.findByCriteria(criteria).get(0);
	}
	
	@Override
	public List<E> search(int start, int limit, String orderBy,
			Object filter) {
		return null;
	}
	
	public List<E> searchByProperty(int start, int limit, String orderBy, String propertyName, Object value){
		DetachedCriteria criteria = DetachedCriteria.forClass(clazz);
		Criterion cr = Restrictions.eq(propertyName, value);
		criteria.add(cr);
		return hibernateTemplate.findByCriteria(criteria);
	}
	
	protected DetachedCriteria createDetachedCriteria() {
        return DetachedCriteria.forClass(clazz);
    }
	
	private DetachedCriteria getHibernateCriteria(List<Criterion> restrictions) {
		
		DetachedCriteria criteria = DetachedCriteria.forClass(clazz);
		
		if (!restrictions.isEmpty()){ //filters is optional
			
			for (Criterion criterion : restrictions){
				criteria.add(criterion);
			}
		}
		
		return criteria;
	}
	
	public int getTotal() {
		
		DetachedCriteria criteria = getHibernateCriteria(getRestrictions());
		
		Projection projection = Projections.rowCount();
		criteria.setProjection(projection);
		
		return DataAccessUtils.intResult(hibernateTemplate.findByCriteria(criteria));
	}
    
}
