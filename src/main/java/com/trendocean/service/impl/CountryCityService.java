package com.trendocean.service.impl;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.City;
import com.trendocean.domain.Country;
import com.trendocean.service.ICountryCityService;
import com.trendocean.service.db.ICityDBService;
import com.trendocean.service.db.ICountryDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryCityService implements ICountryCityService {

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
}
