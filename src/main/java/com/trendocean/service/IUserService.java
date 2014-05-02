package com.trendocean.service;


import com.trendocean.TrendoceanResponse;

public interface IUserService {

    TrendoceanResponse getUserWithUsername(String username) throws Exception;

}
