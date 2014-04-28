package com.trendocean.service.db;

import com.trendocean.domain.User;

import java.util.List;


public interface IUserDBService extends IDBService<User>{

    List<User> getUserWithUsername(String username) throws Exception;

    List<User> getUserWithEmail(String email) throws Exception;

}
