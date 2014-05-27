package com.trendocean.domain;


import com.trendocean.domain.base.AbstractEntity;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@JsonAutoDetect
@Entity
public class Profile extends AbstractEntity implements Serializable {

    private String username;
    private String password;
    private String email;
    private String fullName;
    private String about;
    private String countryCode;
    private String countryName;
    private String cityCode;
    private String cityName;
    private String birthday;

    @OneToOne(cascade=CascadeType.ALL)
    private ProfileOceanDesigns profileOceanDesigns;

    @OneToOne(cascade=CascadeType.ALL)
    private ProfileOceanSettings profileOceanSettings;

    @OneToOne(cascade=CascadeType.ALL)
    private ProfileOceanStats profileOceanStats;

    /*
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> askedQuestions=new ArrayList<Question>();


    @OneToMany(fetch=FetchType.LAZY, targetEntity=Question.class, cascade=CascadeType.ALL)
    private Set<Question> answeredQuestions;

    @OneToMany(fetch=FetchType.LAZY, targetEntity=Question.class, cascade=CascadeType.ALL)
    private Set<Question> favedQuestions;

    @OneToMany(fetch=FetchType.LAZY, targetEntity=Message.class, cascade=CascadeType.ALL)
    private Set<Message> publicMessages;
    */

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    @Enumerated(EnumType.STRING)
    private AccountStateEnum accountState;

    @Enumerated(EnumType.STRING)
    private EducationEnum education;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public AccountStateEnum getAccountState() {
        return accountState;
    }

    public void setAccountState(AccountStateEnum accountState) {
        this.accountState = accountState;
    }

    public EducationEnum getEducation() {
        return education;
    }

    public void setEducation(EducationEnum education) {
        this.education = education;
    }

    public ProfileOceanDesigns getProfileOceanDesigns() {
        return profileOceanDesigns;
    }

    public void setProfileOceanDesigns(ProfileOceanDesigns profileOceanDesigns) {
        this.profileOceanDesigns = profileOceanDesigns;
    }

    public ProfileOceanSettings getProfileOceanSettings() {
        return profileOceanSettings;
    }

    public void setProfileOceanSettings(ProfileOceanSettings profileOceanSettings) {
        this.profileOceanSettings = profileOceanSettings;
    }

    public ProfileOceanStats getProfileOceanStats() {
        return profileOceanStats;
    }

    public void setProfileOceanStats(ProfileOceanStats profileOceanStats) {
        this.profileOceanStats = profileOceanStats;
    }


    /*
    @JsonIgnore
    public List<Question> getAskedQuestions() {
        return askedQuestions;
    }

    public void setAskedQuestions(List<Question> askedQuestions) {
        this.askedQuestions = askedQuestions;
    } */

}
