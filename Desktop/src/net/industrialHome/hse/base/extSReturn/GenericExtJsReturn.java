package net.industrialHome.hse.base.extSReturn;

import net.industrialHome.hse.entity.BaseEntity;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class GenericExtJsReturn<E extends BaseEntity<Long>> extends ExtJsReturnAPI<E>{

}
