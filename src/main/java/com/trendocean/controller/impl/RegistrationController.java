package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.IRegistrationController;
import com.trendocean.domain.Profile;
import com.trendocean.util.mail.IEmailService;
import com.trendocean.service.IRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegistrationController  implements IRegistrationController{



    @Autowired
    IRegistrationService registrationService;

    @Autowired
    IEmailService emailService;

    @Value("${activationmail.content}")
    private String activationMailSubject;

    @Value("${activationmail.content}")
    private String activationMailContent;


    @Override
    public TrendoceanResponse listCountry() throws Exception {
        return registrationService.getCountries();
    }

    @Override
    public TrendoceanResponse listCity(@RequestParam String countryCode) throws Exception {
        return registrationService.getCities(countryCode);
    }

    @Override
    public TrendoceanResponse checkUsername(@RequestParam String username) throws Exception {
        return registrationService.checkUsername(username);
    }

    @Override
    public TrendoceanResponse checkEmail(@RequestParam String email) throws Exception {
        return registrationService.checkEmail(email);
    }

    @Override
    public TrendoceanResponse addUser(@RequestBody Profile user) throws Exception {
        return registrationService.addUser(user);
    }

    @Override
    public TrendoceanResponse resetPassword(@RequestParam String email) throws Exception {
        String names[]={email};
        emailService.sendMailWithoutAttachment(activationMailSubject,activationMailContent,names);
        return new TrendoceanResponse.Builder().setData(email).setSuccess(true).build();
    }
}
