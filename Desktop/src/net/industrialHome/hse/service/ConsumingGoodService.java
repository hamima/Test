package net.industrialHome.hse.service;

import java.util.List;

import net.industrialHome.hse.base.service.BaseService;
import net.industrialHome.hse.entity.ConsumingGood;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ConsumingGoodService extends BaseService<ConsumingGood>{
	
	public List<ConsumingGood> getGoodsByGroup(Long id){
		return getDao().searchByProperty(0, 0, "", "consumingGoodsGroup.id", id);
	}
}
