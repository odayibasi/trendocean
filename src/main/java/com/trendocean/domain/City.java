package com.trendocean.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.trendocean.domain.base.AbstractEntity;
import com.trendocean.domain.base.IEntity;

import javax.persistence.Entity;
import java.io.Serializable;


@JsonAutoDetect
@Entity
public class City extends AbstractEntity implements Serializable {

    public City() {
    }

    public City(String cityCode, String cityName, String countryName, String countryCode) {
        this.cityCode = cityCode;
        this.cityName = cityName;
        this.countryName = countryName;
        this.countryCode = countryCode;
    }

    private String cityCode;

    private String cityName;

    private String countryName;

    private String countryCode;

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }


}
