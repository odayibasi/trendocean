package com.trendocean.controller;

import com.trendocean.TrendoceanResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public interface ICountryCityController{

    @RequestMapping(value = "country/")
    public @ResponseBody
    TrendoceanResponse getCountries() throws Exception;

    @RequestMapping(value = "country/city")
    public @ResponseBody
    TrendoceanResponse getCities(@RequestParam String countryCode) throws Exception;

}
