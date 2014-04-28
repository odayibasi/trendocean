package com.trendocean.service.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.ViolationResult;
import com.trendocean.domain.*;
import com.trendocean.service.IRegistrationService;
import com.trendocean.service.db.IUserDBService;
import com.trendocean.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService implements IRegistrationService{

    @Autowired
    IUserDBService userDBService;

    @Override
    public TrendoceanResponse checkUsername(String username) throws Exception {
       List<Profile> users=userDBService.getUserWithUsername(username);
       return new TrendoceanResponse.Builder().setSuccess(users==null || users.size()==0).build();
    }

    @Override
    public TrendoceanResponse checkEmail(String email) throws Exception {
        List<Profile> users=userDBService.getUserWithEmail(email);
        return new TrendoceanResponse.Builder().setSuccess(users==null || users.size()==0).build();
    }

    @Override
    public TrendoceanResponse addUser(Profile user) throws Exception {
      user.setPassword(PasswordUtil.getInstance().encrypt(user.getPassword()));
      user.setAccountState(AccountStateEnum.WAITING_ACTIVATION);
      user.setProfileOceanDesigns(new ProfileOceanDesigns());
      user.setProfileOceanSettings(new ProfileOceanSettings());
      user.setProfileOceanStats(new ProfileOceanStats());
      List<ViolationResult> violationResults=userDBService.save(user);
      if(violationResults==null  || violationResults.size()==0){
          user.setPassword("secured");
          return new TrendoceanResponse.Builder().setSuccess(true).setData(user).build();
      }
        return new TrendoceanResponse.Builder().setSuccess(false).build();
    }


}
