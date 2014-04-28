package com.trendocean.dao.hibernate;

import com.trendocean.dao.ICityDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.City;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CityHibernateDAO  extends BaseDAOImpl<City> implements ICityDAO{
    @Override
    public List<City> getCities(String countryCode) {
        try{
            Session session = getSession().getSessionFactory().openSession();
            session.beginTransaction();
            Criteria c = session.createCriteria(City.class);
            c.add(Restrictions.eq("countryCode", countryCode));
            return c.list();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<City>();
        }

    }
}
