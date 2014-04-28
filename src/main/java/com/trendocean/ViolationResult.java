package com.trendocean;

public class ViolationResult {
	
	int code;
    String message;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "SelfCareViolationResult{" +
                "code=" + code +
                ", message='" + message + '\'' +
                '}';
    }

    public static class Builder{

        private int code;
        private String message;

        public Builder setCode(int code) {
            this.code = code;
            return this;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public ViolationResult build(){
             ViolationResult trendoceanViolationResult=new ViolationResult();
             trendoceanViolationResult.setCode(code);
             trendoceanViolationResult.setMessage(message);
             return trendoceanViolationResult;
        }
    }


}
