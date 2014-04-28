package com.trendocean.service.db;

import com.trendocean.domain.TrendoceanUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface IUserDBService extends IDBService<TrendoceanUser>{

    @Transactional
    List<TrendoceanUser> getUserWithUsername(String username) throws Exception;

    @Transactional
    List<TrendoceanUser> getUserWithEmail(String email) throws Exception;

}
