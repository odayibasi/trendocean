package com.trendocean.dao.hibernate;

import com.trendocean.dao.IProfileDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.Profile;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProfileHiberbateDAO extends BaseDAOImpl<Profile> implements IProfileDAO {

    @Override
    public List<Profile> getUserWithUsername(String username) throws Exception {
        try{

            Criteria c = getSession().createCriteria(Profile.class);
            c.add(Restrictions.eq("username", username));
            return c.list();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<Profile>();
        }
    }

    @Override
    public List<Profile> getUserWithEmail(String email) throws Exception {
        try{
            Criteria c = getSession().createCriteria(Profile.class);
            c.add(Restrictions.eq("email", email));
            return c.list();
        }catch (Exception e){
            e.printStackTrace();
            return new ArrayList<Profile>();
        }
    }

}
