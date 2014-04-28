package com.trendocean.service;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.TrendoceanUser;

public interface IRegistrationService {

    TrendoceanResponse checkUsername(String username) throws Exception;

    TrendoceanResponse checkEmail(String email) throws Exception;

    TrendoceanResponse addUser(TrendoceanUser user) throws Exception;
}
