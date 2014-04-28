package com.trendocean.domain.base;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public interface IEntity {

    Long getId();
    void setId(Long id);
}
