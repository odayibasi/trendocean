package com.trendocean.dao;

import com.trendocean.dao.hibernate.base.BaseDAO;
import com.trendocean.domain.User;

import java.util.List;

public interface IUserDAO extends BaseDAO<User> {
    List<User> getUserWithUsername(String username) throws Exception;
    List<User> getUserWithEmail(String email) throws Exception;
}
