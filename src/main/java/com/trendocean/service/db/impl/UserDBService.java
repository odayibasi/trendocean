package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.IUserDAO;
import com.trendocean.domain.User;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("UserDBService")
public class UserDBService implements IUserDBService {

    @Autowired
    IUserDAO userDAO;

    @Override
    public List<ViolationResult> save(User user) {
        return userDAO.save(user);
    }

    @Override
    public List<ViolationResult> saveAll(List<User> users) {
        return userDAO.saveAll(users);
    }

    @Override
    public List<ViolationResult> saveAllBatch(List<User> users) {
        return userDAO.saveAllBatch(users);
    }

    @Override
    public void remove(User user) {
         userDAO.remove(user);
    }

    @Override
    public void removeAll(List<User> users) {
          userDAO.removeAll(users);
    }

    @Override
    public User find(String id) {
        return userDAO.find(id);
    }

    @Override
    public List<User> getAll() {
        return userDAO.getAll();
    }

    @Override
    public List<User> getUserWithUsername(String username) throws Exception {
        return userDAO.getUserWithUsername(username);
    }

    @Override
    public List<User> getUserWithEmail(String email) throws Exception {
        return userDAO.getUserWithUsername(email);
    }


}
