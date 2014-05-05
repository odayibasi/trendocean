package com.trendocean.controller;


import com.trendocean.TrendoceanResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public interface IUserRelationController {

    @RequestMapping(value = "urelation/listRecommendedUser")
    @ResponseBody
    public TrendoceanResponse listRecommendedUser() throws Exception;

    @RequestMapping(value = "urelation/delRecommendedUser")
    @ResponseBody
    public TrendoceanResponse delRecommendedUser(@RequestParam String delUserName) throws Exception;



}
