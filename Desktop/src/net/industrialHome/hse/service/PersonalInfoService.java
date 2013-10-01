package net.industrialHome.hse.service;

import java.util.List;

import net.industrialHome.hse.base.service.BaseService;
import net.industrialHome.hse.entity.PersonalInfo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PersonalInfoService extends BaseService<PersonalInfo>{

	
	
	public List<PersonalInfo> getPersonalsByNationalCode(String nationalCode){
		List<PersonalInfo> entities = getDao().searchByProperty(0, 10, "", "nationalCode", nationalCode);
		
		return entities;
	}
	public List<PersonalInfo> getPersonalsByUserName(String userName){
		List<PersonalInfo> entities = getDao().searchByProperty(0, 10, "", "userName", userName);
		
		return entities;
	}
	
	public List<PersonalInfo> search(int start,int limit,String name){
		String[] query = name.split(" ");
		List<PersonalInfo> entities =getDao().searchByName(start, limit, query);
		
		return entities;
	}
	
}
