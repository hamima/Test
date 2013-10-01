package net.industrialHome.hse.entity;

public class BaseEntity<T> {

	T id;

	public T getId() {
		return id;
	}

	public void setId(T id) {
		this.id = id;
	}

}
