package com.trendocean.service;


public interface IEmailService {

    void sendMail(String from, String to, String subject, String msg);

}
