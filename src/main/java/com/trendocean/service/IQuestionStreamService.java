package com.trendocean.service;


import com.trendocean.TrendoceanResponse;

public interface IQuestionStreamService{

     TrendoceanResponse listLastestQuestion(int startIndex, int endIndex) throws Exception;

     TrendoceanResponse listPopularQuestion(int startIndex, int endIndex, String type) throws Exception;

    TrendoceanResponse listPromotedQuestion(int startIndex, int endIndex) throws Exception;

    TrendoceanResponse listFollowedQuestion(int startIndex, int endIndex) throws Exception;

    TrendoceanResponse listSearchingQuestion(int startIndex, int endIndex) throws Exception;
}
