package com.trendocean.service.db;

import com.trendocean.ViolationResult;
import com.trendocean.domain.base.AbstractEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IDBService<T extends AbstractEntity> {

    @Transactional
    public List<ViolationResult> save(T t);

    @Transactional
    public List<ViolationResult> saveAll(List<T> tList);

    @Transactional
    public List<ViolationResult> saveAllBatch(List<T> tList);

    @Transactional
    public void remove(T t);

    @Transactional
    public void removeAll(List<T> tList);

    @Transactional
    public T find(String id);

    @Transactional
    public List<T> getAll();
}
