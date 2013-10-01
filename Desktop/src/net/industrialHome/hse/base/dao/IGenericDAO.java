package net.industrialHome.hse.base.dao;

import java.util.List;

import org.hibernate.criterion.Criterion;

public interface IGenericDAO<E> {
	E save(E e);
	E update(E e);
	void delete(E e);
	List<E> getAll(int start, int limit, List<Criterion> restrictions);
	List<E> search(int start, int limit, String orderBy, Object filter);
	List<E> searchByProperty(int start, int limit, String orderBy, String propertyName, Object value);
	int totalNum();
}
