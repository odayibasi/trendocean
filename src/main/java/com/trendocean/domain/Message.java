package com.trendocean.domain;

import com.trendocean.domain.base.AbstractEntity;
import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.persistence.Entity;
import java.io.Serializable;

@JsonAutoDetect
@Entity
public class Message extends AbstractEntity implements Serializable{

    private String sender;
    private String messageText;
    private String receiver;
    private Long creationDate;
    private boolean isRemovableByRequester;
    private boolean canReplyByRequester;
    private String smallAvatar;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Long creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isRemovableByRequester() {
        return isRemovableByRequester;
    }

    public void setRemovableByRequester(boolean isRemovableByRequester) {
        this.isRemovableByRequester = isRemovableByRequester;
    }

    public boolean isCanReplyByRequester() {
        return canReplyByRequester;
    }

    public void setCanReplyByRequester(boolean canReplyByRequester) {
        this.canReplyByRequester = canReplyByRequester;
    }

    public String getSmallAvatar() {
        return smallAvatar;
    }

    public void setSmallAvatar(String smallAvatar) {
        this.smallAvatar = smallAvatar;
    }
}
