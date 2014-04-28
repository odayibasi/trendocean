package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IUserController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController implements IUserController{

    @Override
    public TrendoceanResponse helloTrendocean(@RequestParam(value = "name", required = false, defaultValue = "World") String name) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).setData("Hello"+name).build();
    }

}
