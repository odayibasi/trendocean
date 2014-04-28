package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.ICityDAO;
import com.trendocean.domain.City;
import com.trendocean.service.db.ICityDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("CityDBService")
public class CityDBService implements ICityDBService{

    @Autowired
    ICityDAO cityDAO;

    @Override
    public List<ViolationResult> save(City city) {
        return cityDAO.save(city);
    }

    @Override
    public List<ViolationResult> saveAll(List<City> cities) {
        return cityDAO.saveAll(cities);
    }

    @Override
    public List<ViolationResult> saveAllBatch(List<City> cities) {
        return cityDAO.saveAllBatch(cities);
    }

    @Override
    public void remove(City city) {
       cityDAO.remove(city);
    }

    @Override
    public void removeAll(List<City> cities) {
       cityDAO.removeAll(cities);
    }

    @Override
    public City find(String id) {
        return cityDAO.find(id);
    }

    @Override
    public List<City> getAll() {
        return cityDAO.getAll();
    }

    @Override
    public List<City> getCities(String countryCode) {
        return cityDAO.getCities(countryCode);
    }
}
