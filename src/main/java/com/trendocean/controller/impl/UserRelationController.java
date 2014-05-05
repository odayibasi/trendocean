package com.trendocean.controller.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IUserRelationController;
import com.trendocean.service.IUserRelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserRelationController implements IUserRelationController {
    @Autowired
    IUserRelationService userRelationService;

    @Override
    public TrendoceanResponse listRecommendedUser() throws Exception {
        return userRelationService.listRecommendedUser();
    }

    @Override
    public TrendoceanResponse delRecommendedUser(@RequestParam String delUserName) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).build();
    }
}
