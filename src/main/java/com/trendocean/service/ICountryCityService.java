package com.trendocean.service;

import com.trendocean.TrendoceanResponse;

public interface ICountryCityService {

    TrendoceanResponse getCountries() throws Exception;

    TrendoceanResponse getCities(String countryCode);
}
