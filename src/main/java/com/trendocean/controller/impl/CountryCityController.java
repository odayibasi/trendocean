package com.trendocean.controller.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.controller.ICountryCityController;
import com.trendocean.service.ICountryCityService;
import com.trendocean.service.db.ICountryDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CountryCityController implements ICountryCityController {

    @Autowired
    ICountryCityService countryCityService;



    @Override
    public TrendoceanResponse getCountries() throws Exception {
        return countryCityService.getCountries();
    }

    @Override
    public TrendoceanResponse getCities(String countryCode) throws Exception {
        return countryCityService.getCities(countryCode);
    }
}
