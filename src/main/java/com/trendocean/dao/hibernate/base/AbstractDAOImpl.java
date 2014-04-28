package com.trendocean.dao.hibernate.base;

import com.trendocean.util.LogUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class AbstractDAOImpl {


    protected final Logger logger = LogUtil.getLogger();

    @PersistenceContext
    protected EntityManager entityManager;


    protected Session getSession() {
        return (Session) entityManager.getDelegate();
    }
    
}