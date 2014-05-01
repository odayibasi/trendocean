package com.trendocean.service;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.Profile;

public interface IRegistrationService {

    TrendoceanResponse getCountries() throws Exception;

    TrendoceanResponse getCities(String countryCode) throws Exception;

    TrendoceanResponse checkUsername(String username) throws Exception;

    TrendoceanResponse checkEmail(String email) throws Exception;

    TrendoceanResponse addUser(Profile user) throws Exception;
}
