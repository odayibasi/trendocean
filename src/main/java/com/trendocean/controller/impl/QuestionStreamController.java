package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IQuestionStreamController;
import com.trendocean.service.IQuestionStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;

@Controller
public class QuestionStreamController implements IQuestionStreamController {

    @Autowired
    IQuestionStreamService questionStreamService;

    @Override
    public TrendoceanResponse listLatestQuestion(int startIndex, int endIndex) throws Exception {
        return questionStreamService.listLastestQuestions();
    }

    @Override
    public TrendoceanResponse listTag() throws Exception {
        ArrayList<String> tags=new ArrayList<String>();
        tags.add("Fenerbahçe");
        tags.add("Siyaset");
        tags.add("Porsche");
        tags.add("Konut Sigortasi");
        tags.add("Emlak");
        tags.add("Bilişim");
        return new TrendoceanResponse.Builder().setData(tags).setSuccess(true).build();
    }
}
