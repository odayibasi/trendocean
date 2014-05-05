package com.trendocean.service.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Profile;
import com.trendocean.service.IUserRelationService;
import com.trendocean.service.IUserService;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRelationService implements IUserRelationService{

    @Autowired
    IUserDBService userDBService;

    @Override
    public TrendoceanResponse listRecommendedUser() throws Exception {
        List<Profile> users=userDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(users).build();

    }
}
