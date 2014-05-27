package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.IProfileDAO;
import com.trendocean.domain.Message;
import com.trendocean.domain.Profile;
import com.trendocean.domain.Question;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public Profile getUserWithUsername(String username) throws Exception {
        Profile profile=userDAO.getUserWithUsername(username);
        return profile;
    }

    @Override
    @Transactional
    public Profile getUserWithEmail(String email) throws Exception {
        Profile profile= userDAO.getUserWithEmail(email);
        return profile;
    }

    @Override
    @Transactional
    public Set<Question> getAskedQuestionList(String username) throws Exception {
        Profile user=getUserWithUsername(username);
        return null;

    }

    @Override
    @Transactional
    public Set<Question> getAnsweredQuestionList(String username) throws Exception {
        Profile user=getUserWithUsername(username);
        return null;
    }

    @Override
    @Transactional
    public Set<Question> getFavedQuestionList(String username) throws Exception {
        Profile user=getUserWithUsername(username);
        return null;
    }

    @Override
    @Transactional
    public Set<Message> getPublicMsgList(String username) throws Exception {
        Profile user=getUserWithUsername(username);
        return null;
    }


}
