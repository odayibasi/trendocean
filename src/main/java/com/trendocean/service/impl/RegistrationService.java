package com.trendocean.service.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.ViolationResult;
import com.trendocean.domain.*;
import com.trendocean.service.IRegistrationService;
import com.trendocean.service.db.ICityDBService;
import com.trendocean.service.db.ICountryDBService;
import com.trendocean.service.db.IUserDBService;
import com.trendocean.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService implements IRegistrationService{

    @Autowired
    IUserDBService userDBService;

    @Autowired
    ICountryDBService countryDBService;

    @Autowired
    ICityDBService cityDBService;


    @Override
    public TrendoceanResponse getCountries() throws Exception{
        List<Country> countries=countryDBService.getAll();
        return new TrendoceanResponse.Builder().setSuccess(true).setData(countries).build();
    }

    @Override
    public TrendoceanResponse getCities(String countryCode) {
        List<City> cities=cityDBService.getCities(countryCode);
        return new TrendoceanResponse.Builder().setSuccess(true).setData(cities).build();
    }

    @Override
    public TrendoceanResponse checkUsername(String username) throws Exception {
       Profile user=userDBService.getUserWithUsername(username);
       return new TrendoceanResponse.Builder().setSuccess(user==null).build();
    }

    @Override
    public TrendoceanResponse checkEmail(String email) throws Exception {
        Profile user=userDBService.getUserWithEmail(email);
        return new TrendoceanResponse.Builder().setSuccess(user==null).build();
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
