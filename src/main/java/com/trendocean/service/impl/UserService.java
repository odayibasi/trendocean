package com.trendocean.service.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Message;
import com.trendocean.domain.Profile;
import com.trendocean.domain.Question;
import com.trendocean.service.IUserService;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService implements IUserService{

    @Autowired
    IUserDBService userDBService;


    @Override
    public TrendoceanResponse getUserWithUsername(String username) throws Exception {
        Profile user=userDBService.getUserWithUsername(username);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(user).build();
    }

    @Override
    public TrendoceanResponse getAskedQuestionList(String username) throws Exception {
        Set<Question> questionS=userDBService.getAskedQuestionList(username);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }

    @Override
    public TrendoceanResponse getAnsweredQuestionList(String username) throws Exception {
        Set<Question> questionS=userDBService.getAnsweredQuestionList(username);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }

    @Override
    public TrendoceanResponse getFavedQuestionList(String username) throws Exception {
        Set<Question> questionS=userDBService.getFavedQuestionList(username);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }

    @Override
    public TrendoceanResponse getPublicMsgList(String username) throws Exception {
        Set<Message> messageS=userDBService.getPublicMsgList(username);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(messageS).build();
    }
}
