package net.industrialHome.hse.base.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class AbstractJpaDAO<T> {
	private Class<T> clazz;
	
	@PersistenceContext
	EntityManager entityManager;

	public void setClazz(final Class<T> clazzToSet) {
		this.clazz = clazzToSet;
	}

	public T findOne(final Long id) {
		return entityManager.find(clazz, id);
	}

	public List<T> findAll() {
		return entityManager.createQuery("from " + clazz.getName())
				.getResultList();
	}
	
	public List<T> getAll(int start, int limit, String orderBy) {
		return entityManager.createQuery("from " + clazz.getName()).setFirstResult(start).setMaxResults(start).getResultList();
	}

	public T save(final T entity) {
			entityManager.persist(entity);
			return entity; 
	}

	public T update(final T entity) {
		entityManager.merge(entity);
		return entity;
	}

	public void delete(final T entity) {
		entityManager.remove(entity);
	}
	
	public T getById(final Long id){
		return entityManager.find(clazz, id);
	}
	
	public int totalNum(){
		return entityManager.createQuery("from " + clazz.getName())
				.getResultList().size();
	}
	
	
	public void deleteById(final Long entityId) {
		final T entity = getById(entityId);
		delete(entity);
	}
}
