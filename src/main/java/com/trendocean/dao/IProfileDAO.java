package com.trendocean.dao;

import com.trendocean.dao.hibernate.base.BaseDAO;
import com.trendocean.domain.Profile;

import java.util.List;

public interface IProfileDAO extends BaseDAO<Profile> {
    List<Profile> getUserWithUsername(String username) throws Exception;
    List<Profile> getUserWithEmail(String email) throws Exception;
}
