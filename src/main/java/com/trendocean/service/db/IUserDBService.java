package com.trendocean.service.db;

import com.trendocean.domain.Message;
import com.trendocean.domain.Profile;
import com.trendocean.domain.Question;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;


public interface IUserDBService extends IDBService<Profile>{

    @Transactional
    Profile getUserWithUsername(String username) throws Exception;

    @Transactional
    Profile getUserWithEmail(String email) throws Exception;

    @Transactional
    Set<Question> getAskedQuestionList(String username) throws Exception;

    @Transactional
    Set<Question> getAnsweredQuestionList(String username) throws Exception;

    @Transactional
    Set<Question> getFavedQuestionList(String username) throws Exception;


    @Transactional
    Set<Message> getPublicMsgList(String username) throws Exception;

}
