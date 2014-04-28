package com.trendocean.dao.hibernate;

import com.trendocean.dao.ICountryDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.Country;
import org.springframework.stereotype.Repository;


@Repository
public class CountryHibernateDAO extends BaseDAOImpl<Country> implements ICountryDAO {



}
