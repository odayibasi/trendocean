package com.trendocean.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.trendocean.domain.base.AbstractEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonAutoDetect
@Entity
public class Question extends AbstractEntity implements Serializable {

    private String body;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Choice> choices = new ArrayList<Choice>(5);
    private String reaskUser = "";
    private String owner;
    private String ownerFullName;
    private String ownerSmallAvatarURL;

    @Enumerated(EnumType.STRING)
    private QuestionStatusEnum status;

    private String approver;
    private long creationDate;
    private long answerDateOfCurrentUser;
    private long likedCount;
    private long totalAnswerCount;
    private int answer = -1;
    private int answerOfOtherUser = -1;
    private long numberOfComments;
    private boolean isQuestionAbused;
    private boolean isQuestionFaved;
    private boolean isPromoted;
    private String combinedText;
    private String language;

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public String getReaskUser() {
        return reaskUser;
    }

    public void setReaskUser(String reaskUser) {
        this.reaskUser = reaskUser;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getOwnerFullName() {
        return ownerFullName;
    }

    public void setOwnerFullName(String ownerFullName) {
        this.ownerFullName = ownerFullName;
    }

    public String getOwnerSmallAvatarURL() {
        return ownerSmallAvatarURL;
    }

    public void setOwnerSmallAvatarURL(String ownerSmallAvatarURL) {
        this.ownerSmallAvatarURL = ownerSmallAvatarURL;
    }

    public QuestionStatusEnum getStatus() {
        return status;
    }

    public void setStatus(QuestionStatusEnum status) {
        this.status = status;
    }

    public String getApprover() {
        return approver;
    }

    public void setApprover(String approver) {
        this.approver = approver;
    }

    public long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(long creationDate) {
        this.creationDate = creationDate;
    }

    public long getAnswerDateOfCurrentUser() {
        return answerDateOfCurrentUser;
    }

    public void setAnswerDateOfCurrentUser(long answerDateOfCurrentUser) {
        this.answerDateOfCurrentUser = answerDateOfCurrentUser;
    }

    public long getLikedCount() {
        return likedCount;
    }

    public void setLikedCount(long likedCount) {
        this.likedCount = likedCount;
    }

    public long getTotalAnswerCount() {
        return totalAnswerCount;
    }

    public void setTotalAnswerCount(long totalAnswerCount) {
        this.totalAnswerCount = totalAnswerCount;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }

    public int getAnswerOfOtherUser() {
        return answerOfOtherUser;
    }

    public void setAnswerOfOtherUser(int answerOfOtherUser) {
        this.answerOfOtherUser = answerOfOtherUser;
    }

    public long getNumberOfComments() {
        return numberOfComments;
    }

    public void setNumberOfComments(long numberOfComments) {
        this.numberOfComments = numberOfComments;
    }

    public boolean isQuestionAbused() {
        return isQuestionAbused;
    }

    public void setQuestionAbused(boolean isQuestionAbused) {
        this.isQuestionAbused = isQuestionAbused;
    }

    public boolean isQuestionFaved() {
        return isQuestionFaved;
    }

    public void setQuestionFaved(boolean isQuestionFaved) {
        this.isQuestionFaved = isQuestionFaved;
    }

    public boolean isPromoted() {
        return isPromoted;
    }

    public void setPromoted(boolean isPromoted) {
        this.isPromoted = isPromoted;
    }

    public String getCombinedText() {
        return combinedText;
    }

    public void setCombinedText(String combinedText) {
        this.combinedText = combinedText;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
