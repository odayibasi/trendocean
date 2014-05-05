package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IUserController;
import com.trendocean.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController implements IUserController{

    @Autowired
    IUserService userService;

   @Override
    public TrendoceanResponse helloTrendocean(@RequestParam(value = "name", required = false, defaultValue = "World")String name) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).setData("Hello"+name).build();
    }

    @Override
    public TrendoceanResponse getUser(@PathVariable("username") String username) throws Exception {
        return userService.getUserWithUsername(username);
    }

    @Override
    public TrendoceanResponse getTrend(@RequestParam String username) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).setData("70").build();
    }

    @Override
    public TrendoceanResponse followOtherUser(@RequestParam String otherUsername) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).build();
    }


}
