package com.trendocean.dao;

import com.trendocean.dao.hibernate.base.BaseDAO;
import com.trendocean.domain.TrendoceanUser;

import java.util.List;

public interface IUserDAO extends BaseDAO<TrendoceanUser> {
    List<TrendoceanUser> getUserWithUsername(String username) throws Exception;
    List<TrendoceanUser> getUserWithEmail(String email) throws Exception;
}
