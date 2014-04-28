package com.trendocean;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.io.Serializable;

@JsonAutoDetect
public class TrendoceanResponse implements Serializable{

        private boolean success;
        private String code;
        private String desc;
        private Object data;



    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static class Builder{

        private boolean success;
        private String code;
        private String desc;
        private Object data;

        public Builder setSuccess(final boolean success) {
            this.success = success;
            return this;
        }

        public Builder setCode(final String code) {
            this.code = code;
            return this;
        }

        public Builder setDesc(final String desc) {
            this.desc = desc;
            return this;
        }

        public Builder setData(final Object data) {
            this.data = data;
            return this;
        }

        public TrendoceanResponse build() {

            TrendoceanResponse resp = new TrendoceanResponse();
            resp.setSuccess(success);
            resp.setCode(code);
            resp.setDesc(desc);
            resp.setData(data);
            return resp;
        }

    }



}
