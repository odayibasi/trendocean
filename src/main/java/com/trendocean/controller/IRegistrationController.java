package com.trendocean.controller;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Profile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public interface IRegistrationController {

    @RequestMapping(value = "registration/listCountry")
    public @ResponseBody
    TrendoceanResponse listCountry() throws Exception;

    @RequestMapping(value = "registration/listCity")
    public @ResponseBody
    TrendoceanResponse listCity(@RequestParam String countryCode) throws Exception;

    @RequestMapping(value = "registration/checkUsername")
    public @ResponseBody
    TrendoceanResponse checkUsername(@RequestParam String username) throws Exception;

    @RequestMapping(value = "registration/checkEmail")
    public @ResponseBody
    TrendoceanResponse checkEmail(@RequestParam String email) throws Exception;

    @RequestMapping(value = "registration/addUser")
    public @ResponseBody
    TrendoceanResponse addUser(@RequestBody Profile user) throws Exception;

    @RequestMapping(value = "registration/resetPassword")
    public @ResponseBody
    TrendoceanResponse resetPassword(@RequestParam String email) throws Exception;


}
