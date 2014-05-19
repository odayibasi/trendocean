package com.trendocean.service.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Choice;
import com.trendocean.domain.Profile;
import com.trendocean.domain.Question;
import com.trendocean.security.SecurityHelper;
import com.trendocean.service.IQuestionService;
import com.trendocean.service.db.IQuestionDBService;
import com.trendocean.service.db.IUserDBService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class QuestionService implements IQuestionService {


     @Autowired
    IQuestionDBService questionDBService;

    IUserDBService userDBService;


    @Override
    public TrendoceanResponse addQuestion(String questionJSON) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Profile loggedInUser= SecurityHelper.getLoggedInUser();
        Question newQuestion  =  mapper.readValue(questionJSON, Question.class);
        newQuestion.setOwner(loggedInUser.getUsername());
        newQuestion.setOwnerFullName(loggedInUser.getFullName());
        newQuestion.setOwnerSmallAvatarURL(loggedInUser.getProfileOceanDesigns().getSmallAvatar());
        questionDBService.save(newQuestion);

        return new TrendoceanResponse.Builder().setSuccess(true).setData(newQuestion).build();
    }

    @Override
    public TrendoceanResponse getQuestion(String qId) throws Exception {
        Question question=questionDBService.find(qId);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(question).build();
    }
}
