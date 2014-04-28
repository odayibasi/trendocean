package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.ICountryDAO;
import com.trendocean.domain.Country;
import com.trendocean.service.db.ICountryDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("CountryDBService")
public class CountryDBService implements ICountryDBService {

    @Autowired
    ICountryDAO countryDAO;

    @Override
    public List<ViolationResult> save(Country country) {
        return countryDAO.save(country);
    }

    @Override
    public List<ViolationResult> saveAll(List<Country> countries) {
        return countryDAO.saveAll(countries);
    }

    @Override
    public List<ViolationResult> saveAllBatch(List<Country> countries) {
        return countryDAO.saveAllBatch(countries);
    }

    @Override
    public void remove(Country country) {
         countryDAO.remove(country);
    }

    @Override
    public void removeAll(List<Country> countries) {
        countryDAO.removeAll(countries);
    }

    @Override
    public Country find(String id) {
        return countryDAO.find(id);
    }

    @Override
    public List<Country> getAll() {
        return countryDAO.getAll();
    }
}
