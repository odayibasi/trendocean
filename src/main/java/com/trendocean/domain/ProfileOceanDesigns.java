package com.trendocean.domain;


import com.trendocean.domain.base.AbstractEntity;
import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.persistence.Entity;
import java.io.Serializable;

@JsonAutoDetect
@Entity
public class ProfileOceanDesigns extends AbstractEntity implements Serializable {

    private String largeAvatar;
    private String smallAvatar;
    private String themeName = "DEFAULT_THEME_NAME";
    private String backgroundColor = "";
    private String backgroundURL = "";
    private boolean backgroundTiled = false;

    public String getLargeAvatar() {
        return largeAvatar;
    }

    public void setLargeAvatar(String largeAvatar) {
        this.largeAvatar = largeAvatar;
    }

    public String getSmallAvatar() {
        return smallAvatar;
    }

    public void setSmallAvatar(String smallAvatar) {
        this.smallAvatar = smallAvatar;
    }

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public String getBackgroundURL() {
        return backgroundURL;
    }

    public void setBackgroundURL(String backgroundURL) {
        this.backgroundURL = backgroundURL;
    }

    public boolean isBackgroundTiled() {
        return backgroundTiled;
    }

    public void setBackgroundTiled(boolean backgroundTiled) {
        this.backgroundTiled = backgroundTiled;
    }
}
