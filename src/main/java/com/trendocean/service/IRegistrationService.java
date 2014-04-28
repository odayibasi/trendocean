package com.trendocean.service;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.User;

public interface IRegistrationService {

    TrendoceanResponse checkUsername(String username) throws Exception;

    TrendoceanResponse checkEmail(String email) throws Exception;

    TrendoceanResponse addUser(User user) throws Exception;
}
