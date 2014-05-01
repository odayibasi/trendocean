package com.trendocean.controller;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Question;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public interface IQuestionController {

    @RequestMapping(value = "question/addQuestion")
    public @ResponseBody
    TrendoceanResponse addQuestion(@RequestBody Question question) throws Exception;

    @RequestMapping(value = "question/getQuestion")
    public @ResponseBody
    TrendoceanResponse getQuestion(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/addAbuse")
    public @ResponseBody
    TrendoceanResponse addAbuse(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/delAbuse")
    public @ResponseBody
    TrendoceanResponse delAbuse(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/listAbuse")
    public @ResponseBody
    TrendoceanResponse listAbuse(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/addFav")
    public @ResponseBody
    TrendoceanResponse addFav(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/delFav")
    public @ResponseBody
    TrendoceanResponse delFav(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/listFav")
    public @ResponseBody
    TrendoceanResponse listFav(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/addAnswer")
    public @ResponseBody
    TrendoceanResponse addAnswer(@RequestParam String questionId,@RequestParam String choiceId) throws Exception;

    @RequestMapping(value = "question/listAnswer")
    public @ResponseBody
    TrendoceanResponse listAnswer(@RequestParam String questionId) throws Exception;

    @RequestMapping(value = "question/addComment")
    public @ResponseBody
    TrendoceanResponse addComment(@RequestParam String questionId,@RequestParam String comment) throws Exception;

    @RequestMapping(value = "question/delComment")
    public @ResponseBody
    TrendoceanResponse delComment(@RequestParam String questionId,@RequestParam String commentId) throws Exception;

    @RequestMapping(value = "question/listComment")
    public @ResponseBody
    TrendoceanResponse listComment(@RequestParam String questionId,@RequestParam String commentId) throws Exception;


}
