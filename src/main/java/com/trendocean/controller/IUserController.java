package com.trendocean.controller;

import com.trendocean.TrendoceanResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public interface IUserController {

    @RequestMapping(value = "user/helloTrendocean")
    public @ResponseBody
    TrendoceanResponse helloTrendocean(@RequestParam(value = "name", required = false, defaultValue = "World") String name) throws Exception;






}
