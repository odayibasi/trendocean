package com.trendocean.dao.hibernate;

import com.trendocean.dao.IUserDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.City;
import com.trendocean.domain.User;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserHiberbateDAO extends BaseDAOImpl<User> implements IUserDAO {

    @Override
    public List<User> getUserWithUsername(String username) throws Exception {
        try{
            Session session = getSession().getSessionFactory().openSession();
            session.beginTransaction();
            Criteria c = session.createCriteria(User.class);
            c.add(Restrictions.eq("username", username));
            return c.list();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<User>();
        }
    }

    @Override
    public List<User> getUserWithEmail(String email) throws Exception {
        try{
            Session session = getSession().getSessionFactory().openSession();
            session.beginTransaction();
            Criteria c = session.createCriteria(User.class);
            c.add(Restrictions.eq("email", email));
            return c.list();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<User>();
        }
    }

}
