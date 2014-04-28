package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IRegistrationController;
import com.trendocean.domain.TrendoceanUser;
import com.trendocean.service.IRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class RegistrationController  implements IRegistrationController{

    @Autowired
    IRegistrationService registrationService;

    @Override
    public TrendoceanResponse checkUsername(String username) throws Exception {
        return registrationService.checkUsername(username);
    }

    @Override
    public TrendoceanResponse checkEmail(String email) throws Exception {
        return registrationService.checkEmail(email);
    }

    @Override
    public TrendoceanResponse addUser(TrendoceanUser user) throws Exception {
        return registrationService.addUser(user);
    }
}
