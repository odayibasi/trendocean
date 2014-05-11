package com.trendocean.util.mail;


public interface IEmailService {

    boolean sendMail(String subject, String content, String[] recipients, MailAttachment ... attachments);
    boolean sendMailWithoutAttachment(String subject, String content, String[] recipients);


}
