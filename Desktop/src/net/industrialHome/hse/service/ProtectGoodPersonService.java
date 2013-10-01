package net.industrialHome.hse.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.industrialHome.hse.base.service.BaseService;
import net.industrialHome.hse.entity.ProtectGoodPerson;

@Transactional
@Service
public class ProtectGoodPersonService extends BaseService<ProtectGoodPerson> {

}
