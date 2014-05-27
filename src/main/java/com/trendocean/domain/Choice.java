package com.trendocean.domain;


import com.trendocean.domain.base.AbstractEntity;
import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.persistence.Entity;
import java.io.Serializable;


@JsonAutoDetect
@Entity
public class Choice extends AbstractEntity implements Serializable {

    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }




}
