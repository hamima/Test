package net.industrialHome.hse.base.service;

import java.util.List;

public interface IBaseService<E> {
	
	List<E> getAll(int start, int limit, Object filter);
	List<E> save(E entity);
	List<E> update(E entity);
	void delete(E entity);
	int getTotal();
	E getById(Long id);

}
