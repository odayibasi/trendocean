package com.trendocean.controller.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IQuestionController;
import com.trendocean.domain.Question;
import com.trendocean.service.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class QuestionController implements IQuestionController{

    @Autowired
    IQuestionService questionService;

    @Override
    public TrendoceanResponse getQuestion(@PathVariable("qId") String qId) throws Exception {
        return questionService.getQuestion(qId);
    }

    @Override
    public TrendoceanResponse addQuestion(@RequestParam String questionJSON) throws Exception {
        return questionService.addQuestion(questionJSON);
    }

    @Override
    public TrendoceanResponse addAbuse(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse delAbuse(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse listAbuse(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse addFav(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse delFav(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse listFav(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse addAnswer(@RequestParam String questionId, @RequestParam String choiceId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse listAnswer(@RequestParam String questionId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse addComment(@RequestParam String questionId, @RequestParam String comment) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse delComment(@RequestParam String questionId, @RequestParam String commentId) throws Exception {
        return null;
    }

    @Override
    public TrendoceanResponse listComment(@RequestParam String questionId, @RequestParam String commentId) throws Exception {
        return null;
    }
}
