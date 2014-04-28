package com.trendocean.domain;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.trendocean.domain.GenderEnum;
import com.trendocean.domain.base.AbstractEntity;

@JsonAutoDetect
public class User extends AbstractEntity {

      private String username;
      private String password;
      private String email;
      private String fullName;
      private String about;
      private GenderEnum gender;
      private AccountStateEnum accountState;
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
}
