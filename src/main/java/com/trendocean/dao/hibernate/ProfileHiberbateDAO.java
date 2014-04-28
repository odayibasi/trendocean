package com.trendocean.dao.hibernate;

import com.trendocean.dao.IProfileDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.Profile;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProfileHiberbateDAO extends BaseDAOImpl<Profile> implements IProfileDAO {

    @Override
    public Profile getUserWithUsername(String username) throws Exception {
        try{

            Criteria c = getSession().createCriteria(Profile.class);
            c.add(Restrictions.eq("username", username));
            List<Profile> profiles=c.list();
            if(profiles!=null || profiles.size()>0){
                return profiles.get(0);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Profile getUserWithEmail(String email) throws Exception {
        try{
            Criteria c = getSession().createCriteria(Profile.class);
            c.add(Restrictions.eq("email", email));
            List<Profile> profiles=c.list();
            if(profiles!=null || profiles.size()>0){
                return profiles.get(0);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

}
