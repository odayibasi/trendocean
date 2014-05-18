package com.trendocean.service;


import com.trendocean.TrendoceanResponse;

import java.util.concurrent.ExecutionException;

public interface IUserService {

    TrendoceanResponse getUserWithUsername(String username) throws Exception;

    TrendoceanResponse getAskedQuestionList(String username) throws Exception;

    TrendoceanResponse getAnsweredQuestionList(String username) throws Exception;

    TrendoceanResponse getFavedQuestionList(String username) throws Exception;

    TrendoceanResponse getPublicMsgList(String username) throws Exception;


}
