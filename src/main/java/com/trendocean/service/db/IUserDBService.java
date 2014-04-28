package com.trendocean.service.db;

import com.trendocean.domain.Profile;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface IUserDBService extends IDBService<Profile>{

    @Transactional
    Profile getUserWithUsername(String username) throws Exception;

    @Transactional
    Profile getUserWithEmail(String email) throws Exception;

}
