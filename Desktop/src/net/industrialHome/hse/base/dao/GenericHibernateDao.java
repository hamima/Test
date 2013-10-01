package net.industrialHome.hse.base.dao;


import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.config.BeanDefinition;

@Repository
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class GenericHibernateDao<E > extends BaseDAO<E> {

}
