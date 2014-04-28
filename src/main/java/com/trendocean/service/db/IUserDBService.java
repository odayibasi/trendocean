package com.trendocean.service.db;

import com.trendocean.domain.Profile;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface IUserDBService extends IDBService<Profile>{

    @Transactional
    List<Profile> getUserWithUsername(String username) throws Exception;

    @Transactional
    List<Profile> getUserWithEmail(String email) throws Exception;

}
