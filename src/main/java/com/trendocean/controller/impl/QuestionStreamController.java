package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IQuestionStreamController;
import org.springframework.stereotype.Controller;

@Controller
public class QuestionStreamController implements IQuestionStreamController {

    @Override
    public TrendoceanResponse listLatestQuestion(int startIndex, int endIndex) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).build();
    }
}
