package com.trendocean.service.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.User;
import com.trendocean.service.IRegistrationService;
import com.trendocean.service.db.IUserDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService implements IRegistrationService{

    @Autowired
    IUserDBService userDBService;

    @Override
    public TrendoceanResponse checkUsername(String username) throws Exception {
       List<User> users=userDBService.getUserWithUsername(username);
       return new TrendoceanResponse.Builder().setSuccess(users==null || users.size()==0).build();
    }

    @Override
    public TrendoceanResponse checkEmail(String email) throws Exception {
        List<User> users=userDBService.getUserWithEmail(email);
        return new TrendoceanResponse.Builder().setSuccess(users==null || users.size()==0).build();
    }

    @Override
    public TrendoceanResponse addUser(User user) throws Exception {
        return new TrendoceanResponse.Builder().setSuccess(true).build();
    }


}
