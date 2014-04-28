package com.trendocean.service.db;

import com.trendocean.domain.City;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ICityDBService extends IDBService<City> {

    @Transactional
    List<City> getCities(String countryCode);

}
