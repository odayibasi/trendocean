package com.trendocean.service.impl;


import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Profile;
import com.trendocean.service.IUserService;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{

    @Autowired
    IUserDBService userDBService;


    @Override
    public TrendoceanResponse getUserWithUsername(String username) throws Exception {
        Profile user=userDBService.getUserWithUsername(username);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(user).build();
    }
}
