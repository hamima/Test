package net.industrialHome.hse.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.industrialHome.hse.base.service.BaseService;
import net.industrialHome.hse.entity.ProtectGoodPost;

@Transactional
@Service
public class ProtectGoodPostService extends BaseService<ProtectGoodPost> {

	public List<ProtectGoodPost> getAllProtectsByPost(int start, int limit, Long postId, Object filter) {
		// TODO Auto-generated method stub
		List<ProtectGoodPost> searchByPropertyList = getDao().searchByProperty(start, limit, "", "myPost.id", postId);
		return searchByPropertyList;
	}

}
