package com.trendocean.dao;


import com.trendocean.dao.hibernate.base.BaseDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.City;

import java.util.List;

public interface ICityDAO extends BaseDAO<City> {

    List<City> getCities(String countryCode);
}
