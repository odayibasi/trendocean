package com.trendocean.dao.hibernate.base;

import com.trendocean.ViolationResult;
import com.trendocean.domain.base.AbstractEntity;

import java.util.List;

public interface BaseDAO<T extends AbstractEntity> {

    List<ViolationResult> save(T t);

    List<ViolationResult> saveAll(List<T> tList);

    List<ViolationResult> saveAllBatch(List<T> tList);

    void remove(T t);

    void removeAll(List<T> tList);
    
    void removeAllBatch(List<T> tList);

    T find(String id);
    
    List<T> getAll();
    
    List<T> getAll(int startIndex, int maxResult);
    
    List<T> getAllAsScrollable();

    Long countQuery();
}