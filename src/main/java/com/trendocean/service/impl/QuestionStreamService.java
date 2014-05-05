package com.trendocean.service.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Question;
import com.trendocean.service.IQuestionStreamService;
import com.trendocean.service.db.IQuestionDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionStreamService implements IQuestionStreamService {


    @Autowired
    IQuestionDBService questionDBService;

    @Override
    public TrendoceanResponse listLastestQuestion(int startIndex, int endIndex) throws Exception {
        List<Question> questionS=questionDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }

    @Override
    public TrendoceanResponse listPopularQuestion(int startIndex, int endIndex, String type) throws Exception {
        List<Question> questionS=questionDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }

    @Override
    public TrendoceanResponse listPromotedQuestion(int startIndex, int endIndex) throws Exception {
        List<Question> questionS=questionDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }


    @Override
    public TrendoceanResponse listFollowedQuestion(int startIndex, int endIndex) throws Exception {
        List<Question> questionS=questionDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }

    @Override
    public TrendoceanResponse listSearchingQuestion(int startIndex, int endIndex) throws Exception {
        List<Question> questionS=questionDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(questionS).build();
    }


}
