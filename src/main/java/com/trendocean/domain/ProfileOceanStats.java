package com.trendocean.domain;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.trendocean.domain.base.AbstractEntity;

import javax.persistence.Entity;
import java.io.Serializable;

@JsonAutoDetect
@Entity
public class ProfileOceanStats extends AbstractEntity implements Serializable {

    private int questionAnswered;
    private int questionAsked;
    private int followerCount;
    private int followedCount;
    private int favoriteCount;
    private int questionsFavedCount;
    private int profileViewCount;
    private long latestLoginTime;


    public int getQuestionAnswered() {
        return questionAnswered;
    }

    public void setQuestionAnswered(int questionAnswered) {
        this.questionAnswered = questionAnswered;
    }

    public int getQuestionAsked() {
        return questionAsked;
    }

    public void setQuestionAsked(int questionAsked) {
        this.questionAsked = questionAsked;
    }

    public int getFollowerCount() {
        return followerCount;
    }

    public void setFollowerCount(int followerCount) {
        this.followerCount = followerCount;
    }

    public int getFollowedCount() {
        return followedCount;
    }

    public void setFollowedCount(int followedCount) {
        this.followedCount = followedCount;
    }

    public int getFavoriteCount() {
        return favoriteCount;
    }

    public void setFavoriteCount(int favoriteCount) {
        this.favoriteCount = favoriteCount;
    }

    public int getQuestionsFavedCount() {
        return questionsFavedCount;
    }

    public void setQuestionsFavedCount(int questionsFavedCount) {
        this.questionsFavedCount = questionsFavedCount;
    }

    public int getProfileViewCount() {
        return profileViewCount;
    }

    public void setProfileViewCount(int profileViewCount) {
        this.profileViewCount = profileViewCount;
    }

    public long getLatestLoginTime() {
        return latestLoginTime;
    }

    public void setLatestLoginTime(long latestLoginTime) {
        this.latestLoginTime = latestLoginTime;
    }


}
