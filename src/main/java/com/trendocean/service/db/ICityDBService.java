package com.trendocean.service.db;

import com.trendocean.domain.City;

import java.util.List;

public interface ICityDBService extends IDBService<City> {

    List<City> getCities(String countryCode);

}
