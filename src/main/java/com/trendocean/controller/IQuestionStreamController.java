package com.trendocean.controller;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Question;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public interface IQuestionStreamController {

    @RequestMapping(value = "qstream/listLatestQuestion")
    public @ResponseBody
    TrendoceanResponse listLatestQuestion(@RequestParam int startIndex, @RequestParam int endIndex) throws Exception;

    @RequestMapping(value = "qstream/listTag")
    public @ResponseBody
    TrendoceanResponse listTag() throws Exception;

}
