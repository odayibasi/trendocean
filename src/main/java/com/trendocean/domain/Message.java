package com.trendocean.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.trendocean.domain.base.AbstractEntity;

import javax.persistence.Entity;
import java.io.Serializable;

@JsonAutoDetect
@Entity
public class Message extends AbstractEntity implements Serializable{

    private String code;
    private String name;

    public Message() {
    }

    public Message(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
