package net.industrialHome.hse.base.wrapper;

public abstract class DataWrapper<E> {

	E data;

	public E getData() {
		return data;
	}

	public void setData(E data) {
		this.data = data;
	}
	
}
