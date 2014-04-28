package com.trendocean.dao.hibernate.base;

import com.trendocean.ViolationResult;
import com.trendocean.domain.base.AbstractEntity;
import com.trendocean.util.LogUtil;
import org.apache.log4j.Logger;
import org.hibernate.CacheMode;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import javax.annotation.PostConstruct;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;


public abstract class BaseDAOImpl<T extends AbstractEntity> extends AbstractDAOImpl implements BaseDAO<T> {


    protected final Logger logger = LogUtil.getLogger();

    protected Class<T> entityClass;

    @Autowired
    private MessageSource validationMessageBundle;

    //@Value("${db.batch.size}")
    protected int batchSize = 200;

    //@Value("${db.batch.size.read}")
    protected int batchSizeRead = 1000;

    @SuppressWarnings("unchecked")
    public BaseDAOImpl() {
        ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
        this.entityClass = (Class<T>) genericSuperclass.getActualTypeArguments()[0];
    }

    @PostConstruct
    protected void afterPropertiesSet() {
        init();
    }

    // Override if needed
    protected void init() {

    }

    @Override
    public List<ViolationResult> save(T t) {
        try {
            Session delegate = (Session) entityManager.getDelegate();
            delegate.saveOrUpdate(t);
            delegate.flush();
        }
        catch (ConstraintViolationException e) {
            List<ViolationResult> result = new ArrayList<ViolationResult>();
            Iterator<ConstraintViolation<?>> iterator = e.getConstraintViolations().iterator();
            while (iterator.hasNext()) {
                constructViolationResultList(result, iterator.next());
            }
            return result;
        }
        catch (Exception e) {
            logger.info("Exception occured while saving object", e);
            return constructUnknownExceptionViolationResult();
        }

        return null;
    }

    @Override
    public List<ViolationResult> saveAll(List<T> tList) {
        List<ViolationResult> result = new ArrayList<ViolationResult>();
        try {
            Session delegate = (Session) entityManager.getDelegate();
            for (T t : tList) {
                delegate.saveOrUpdate(t);
            }
            delegate.flush();
        }
        catch (ConstraintViolationException e) {
            Iterator<ConstraintViolation<?>> iterator = e.getConstraintViolations().iterator();
            while (iterator.hasNext()) {
                constructViolationResultList(result, iterator.next());
            }
        }
        catch (Exception e) {
            logger.info("Exception occured while saving object", e);
            return constructUnknownExceptionViolationResult(result);
        }

        return result;
    }

    @Override
    public List<ViolationResult> saveAllBatch(List<T> tList) {
        List<ViolationResult> result = new ArrayList<ViolationResult>();
        try {
            int i = 0;
            Session delegate = (Session) entityManager.getDelegate();
            for (T t : tList) {
                delegate.saveOrUpdate(t);

                if(++i % batchSize == 0) {
                    delegate.flush();
                    delegate.clear();
                }
            }
        }
        catch (ConstraintViolationException e) {
            Iterator<ConstraintViolation<?>> iterator = e.getConstraintViolations().iterator();
            while (iterator.hasNext()) {
                constructViolationResultList(result, iterator.next());
            }
        }
        catch (Exception e) {
            logger.info("Exception occured while saving object", e);
            return constructUnknownExceptionViolationResult(result);
        }

        return result;
    }

    @Override
    public void remove(T t) {
        t = entityManager.merge(t);
        entityManager.remove(t);
    }

    @Override
    public void removeAll(List<T> tList) {
        for (int i = 0; i < tList.size(); i++) {
            T t = entityManager.find(entityClass, tList.get(i).getId());
            //T t = entityManager.merge(tList.get(i));
            entityManager.remove(t);
        }
    }

    @Override
    public void removeAllBatch(List<T> tList) {
        int i = 0;
        for (T t : tList) {
            Session delegate = (Session) entityManager.getDelegate();
            delegate.delete(t);

            if(++i % batchSize == 0) {
                delegate.flush();
                delegate.clear();
            }
        }
    }

    @Override
    public T find(String id) {
        return entityManager.find(entityClass, id);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> getAll() {
        return entityManager.createQuery("from " + entityClass.getCanonicalName()).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> getAll(int startIndex, int maxResult) {
        return
                entityManager.
                        createQuery("from " + entityClass.getCanonicalName()).
                        setFirstResult(startIndex).setMaxResults(maxResult).
                        getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> getAllAsScrollable() {
        Session delegate = (Session) entityManager.getDelegate();
        ScrollableResults scroll =
                delegate.
                        createQuery("from " + entityClass.getCanonicalName()).
                        setCacheable(false).
                        setCacheMode(CacheMode.IGNORE).
                        setFetchSize(batchSize).
                        scroll(ScrollMode.FORWARD_ONLY);

        List<T> results = new ArrayList<T>();
        while (scroll.next()) {
            results.add((T)scroll.get(0));
        }
        return results;
    }

    @Override
    public Long countQuery() {
        return (Long)(entityManager.createQuery("select count(a) from " + entityClass.getCanonicalName() + " a").getSingleResult());
    }

    private List<ViolationResult> constructUnknownExceptionViolationResult() {
        List<ViolationResult> result = new ArrayList<ViolationResult>();
        return constructUnknownExceptionViolationResult(result);
    }

    private List<ViolationResult> constructUnknownExceptionViolationResult(List<ViolationResult> result) {
        result.add(new ViolationResult.Builder().setCode(1000).setMessage("Unknown Exception occured while saving object. Contact System Administrator.").build());

        return result;
    }

    private void constructViolationResultList(List<ViolationResult> result, ConstraintViolation<?> violation) {
        String key = violation.getMessageTemplate();
        String message = violation.getMessage();
        key = key.substring(1, key.length() - 1);
        ViolationResult violationResult = new ViolationResult.Builder().
                setCode(Integer.valueOf(validationMessageBundle.getMessage(key, null, Locale.ENGLISH))).
                setMessage(message).
                build();

        result.add(violationResult);
    }



}
