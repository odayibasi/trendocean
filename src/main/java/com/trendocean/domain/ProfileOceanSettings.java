package com.trendocean.domain;


import com.trendocean.domain.base.AbstractEntity;
import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.persistence.Entity;
import java.io.Serializable;

@JsonAutoDetect
@Entity
public class ProfileOceanSettings extends AbstractEntity implements Serializable {

    private boolean profilePublic=true;
    private VisibilityEnum answerVisibility=VisibilityEnum.EVERYONE;
    private boolean notifyWhenSomebodyFollowsMe = true;
    private boolean notifyWhenFriendsAskQuestion = true;
    private boolean notifyWhenMyQuestionsAreCommented = true;
    private boolean notifyWhenMyQuestionAreLoved = true;
    private boolean notifyWhenMyQuestionsAreFlagged = true;
    private boolean notifyWhenSomebodySendACoffe = true;

   public boolean isProfilePublic() {
        return profilePublic;
    }

    public void setProfilePublic(boolean profilePublic) {
        this.profilePublic = profilePublic;
    }

    public VisibilityEnum getAnswerVisibility() {
        return answerVisibility;
    }

    public void setAnswerVisibility(VisibilityEnum answerVisibility) {
        this.answerVisibility = answerVisibility;
    }

    public boolean isNotifyWhenSomebodyFollowsMe() {
        return notifyWhenSomebodyFollowsMe;
    }

    public void setNotifyWhenSomebodyFollowsMe(boolean notifyWhenSomebodyFollowsMe) {
        this.notifyWhenSomebodyFollowsMe = notifyWhenSomebodyFollowsMe;
    }

    public boolean isNotifyWhenFriendsAskQuestion() {
        return notifyWhenFriendsAskQuestion;
    }

    public void setNotifyWhenFriendsAskQuestion(boolean notifyWhenFriendsAskQuestion) {
        this.notifyWhenFriendsAskQuestion = notifyWhenFriendsAskQuestion;
    }

    public boolean isNotifyWhenMyQuestionsAreCommented() {
        return notifyWhenMyQuestionsAreCommented;
    }

    public void setNotifyWhenMyQuestionsAreCommented(boolean notifyWhenMyQuestionsAreCommented) {
        this.notifyWhenMyQuestionsAreCommented = notifyWhenMyQuestionsAreCommented;
    }

    public boolean isNotifyWhenMyQuestionAreLoved() {
        return notifyWhenMyQuestionAreLoved;
    }

    public void setNotifyWhenMyQuestionAreLoved(boolean notifyWhenMyQuestionAreLoved) {
        this.notifyWhenMyQuestionAreLoved = notifyWhenMyQuestionAreLoved;
    }

    public boolean isNotifyWhenMyQuestionsAreFlagged() {
        return notifyWhenMyQuestionsAreFlagged;
    }

    public void setNotifyWhenMyQuestionsAreFlagged(boolean notifyWhenMyQuestionsAreFlagged) {
        this.notifyWhenMyQuestionsAreFlagged = notifyWhenMyQuestionsAreFlagged;
    }

    public boolean isNotifyWhenSomebodySendACoffe() {
        return notifyWhenSomebodySendACoffe;
    }

    public void setNotifyWhenSomebodySendACoffe(boolean notifyWhenSomebodySendACoffe) {
        this.notifyWhenSomebodySendACoffe = notifyWhenSomebodySendACoffe;
    }
}
