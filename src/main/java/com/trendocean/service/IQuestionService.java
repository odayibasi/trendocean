package com.trendocean.service;


import com.trendocean.TrendoceanResponse;

public interface IQuestionService {

    TrendoceanResponse addQuestion(String questionJSON) throws Exception;

    TrendoceanResponse getQuestion(String qId) throws Exception;
}
