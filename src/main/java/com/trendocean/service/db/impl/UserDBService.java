package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.IProfileDAO;
import com.trendocean.domain.Profile;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("UserDBService")
public class UserDBService implements IUserDBService {

    @Autowired
    IProfileDAO userDAO;

    @Override
    @Transactional
    public List<ViolationResult> save(Profile user) {
        return userDAO.save(user);
    }

    @Override
    @Transactional
    public List<ViolationResult> saveAll(List<Profile> users) {
        return userDAO.saveAll(users);
    }

    @Override
    @Transactional
    public List<ViolationResult> saveAllBatch(List<Profile> users) {
        return userDAO.saveAllBatch(users);
    }

    @Override
    @Transactional
    public void remove(Profile user) {
         userDAO.remove(user);
    }

    @Override
    @Transactional
    public void removeAll(List<Profile> users) {
          userDAO.removeAll(users);
    }

    @Override
    @Transactional
    public Profile find(String id) {
        return userDAO.find(id);
    }

    @Override
    @Transactional
    public List<Profile> getAll() {
        return userDAO.getAll();
    }

    @Override
    @Transactional
    public List<Profile> getUserWithUsername(String username) throws Exception {
        return userDAO.getUserWithUsername(username);
    }

    @Override
    @Transactional
    public List<Profile> getUserWithEmail(String email) throws Exception {
        return userDAO.getUserWithUsername(email);
    }


}
