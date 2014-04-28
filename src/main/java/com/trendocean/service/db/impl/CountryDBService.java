package com.trendocean.service.db.impl;

import com.trendocean.ViolationResult;
import com.trendocean.dao.ICountryDAO;
import com.trendocean.domain.Country;
import com.trendocean.service.db.ICountryDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("CountryDBService")
public class CountryDBService implements ICountryDBService {

    @Autowired
    ICountryDAO countryDAO;

    @Override
    @Transactional
    public List<ViolationResult> save(Country country) {
        return countryDAO.save(country);
    }

    @Override
    @Transactional
    public List<ViolationResult> saveAll(List<Country> countries) {
        return countryDAO.saveAll(countries);
    }

    @Override
    @Transactional
    public List<ViolationResult> saveAllBatch(List<Country> countries) {
        return countryDAO.saveAllBatch(countries);
    }

    @Override
    @Transactional
    public void remove(Country country) {
         countryDAO.remove(country);
    }

    @Override
    @Transactional
    public void removeAll(List<Country> countries) {
        countryDAO.removeAll(countries);
    }

    @Override
    @Transactional
    public Country find(String id) {
        return countryDAO.find(id);
    }

    @Override
    @Transactional
    public List<Country> getAll() {
        return countryDAO.getAll();
    }
}
