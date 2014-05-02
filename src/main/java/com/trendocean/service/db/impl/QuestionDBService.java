package com.trendocean.service.db.impl;


import com.trendocean.ViolationResult;
import com.trendocean.dao.IQuestionDAO;
import com.trendocean.domain.Question;
import com.trendocean.service.db.IQuestionDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionDBService implements IQuestionDBService {

    @Autowired
    IQuestionDAO questionDAO;

    @Override
    @Transactional
    public List<ViolationResult> save(Question question) {
        return questionDAO.save(question);
    }

    @Override
    @Transactional
    public List<ViolationResult> saveAll(List<Question> questions) {
        return questionDAO.saveAll(questions);
    }

    @Override
    @Transactional
    public List<ViolationResult> saveAllBatch(List<Question> questions) {
        return questionDAO.saveAllBatch(questions);
    }

    @Override
    @Transactional
    public void remove(Question question) {
          questionDAO.remove(question);
    }

    @Override
    @Transactional
    public void removeAll(List<Question> questions) {
        questionDAO.removeAll(questions);
    }

    @Override
    @Transactional
    public Question find(String id) {
        return questionDAO.find(id);
    }

    @Override
    @Transactional
    public List<Question> getAll() {
        return questionDAO.getAll();
    }
}
