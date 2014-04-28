package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.IUserDAO;
import com.trendocean.domain.TrendoceanUser;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("UserDBService")
public class UserDBService implements IUserDBService {

    @Autowired
    IUserDAO userDAO;

    @Override
    public List<ViolationResult> save(TrendoceanUser user) {
        return userDAO.save(user);
    }

    @Override
    public List<ViolationResult> saveAll(List<TrendoceanUser> users) {
        return userDAO.saveAll(users);
    }

    @Override
    public List<ViolationResult> saveAllBatch(List<TrendoceanUser> users) {
        return userDAO.saveAllBatch(users);
    }

    @Override
    public void remove(TrendoceanUser user) {
         userDAO.remove(user);
    }

    @Override
    public void removeAll(List<TrendoceanUser> users) {
          userDAO.removeAll(users);
    }

    @Override
    public TrendoceanUser find(String id) {
        return userDAO.find(id);
    }

    @Override
    public List<TrendoceanUser> getAll() {
        return userDAO.getAll();
    }

    @Override
    public List<TrendoceanUser> getUserWithUsername(String username) throws Exception {
        return userDAO.getUserWithUsername(username);
    }

    @Override
    public List<TrendoceanUser> getUserWithEmail(String email) throws Exception {
        return userDAO.getUserWithUsername(email);
    }


}
