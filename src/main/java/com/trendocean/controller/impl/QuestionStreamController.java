package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IQuestionStreamController;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;

@Controller
public class QuestionStreamController implements IQuestionStreamController {

    @Override
    public TrendoceanResponse listLatestQuestion(int startIndex, int endIndex) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).build();
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
