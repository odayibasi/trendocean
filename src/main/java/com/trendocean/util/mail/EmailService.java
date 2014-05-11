package com.trendocean.util.mail;


import com.trendocean.util.LogUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Arrays;

@Service
public class EmailService implements IEmailService {


    private static final Logger logger = LogUtil.getLogger();

    @Autowired
    private JavaMailSenderImpl mailSender;
    @Autowired
    private SimpleMailMessage templateMessage;

    // @Value("${sendMail}")
    private boolean sendMail = true;

    @Override
    public boolean sendMail(String subject, String content, String[] recipients, MailAttachment ... attachments) {
        if (!sendMail) {
            logger.info("Skipping mail with content: " + content);
            return true;
        }
        return sendMailInternal(subject, content, recipients, attachments);
    }

    private boolean sendMailInternal(String subject, String content, String[] recipients, MailAttachment ... attachments) {
        if (!sendMail) {
            logger.info("Skipping mail with content: " + content);
            return true;
        }

        if (attachments == null || attachments.length == 0) {
            return sendMailWithoutAttachments(subject, content, recipients);
        }
        else {
            return sendMailWithAttachments(subject, content, recipients, attachments);
        }
    }

    private boolean sendMailWithoutAttachments(String subject, String content, String[] recipients) {
        if (!sendMail) {
            logger.info("Skipping mail with content: " + content);
            return true;
        }
        SimpleMailMessage msg = new SimpleMailMessage(templateMessage);
        msg.setTo(recipients);
        msg.setSubject(subject);
        msg.setText(content);

        try {
            mailSender.send(msg);
            logger.info("Mail has been sent to " + Arrays.asList(recipients));
            return true;
        }
        catch (Exception e) {
            logger.error("Error occured while sending mail to recipients " + Arrays.asList(recipients), e);
            return false;
        }
    }

    private boolean sendMailWithAttachments(String subject, String content, String[] recipients, MailAttachment ... attachments) {
        if (!sendMail) {
            logger.info("Skipping mail with content: " + content);
            return true;
        }
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(templateMessage.getFrom());
            helper.setTo(recipients);
            helper.setSubject(subject);
            helper.setText(content);

            for (final MailAttachment attachment : attachments) {
                helper.addAttachment(attachment.getAttachmentName(), new FileSystemResource(attachment.getAttachmentFile()));
            }

            mailSender.send(message);

            logger.info("Mail has been sent to " + Arrays.asList(recipients));

            return true;
        }
        catch (Exception e) {
            logger.error("Error occured while sending mail to recipients " + Arrays.asList(recipients), e);
            return false;
        }
    }

    public boolean sendMail(String subject, String content, String[] recipients, Resource... attachments) {
        if (!sendMail) {
            logger.info("Skipping mail with content: " + content);
            return true;
        }
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(templateMessage.getFrom());
            helper.setTo(recipients);
            helper.setSubject(subject);
            helper.setText(content);

            for (Resource attachment : attachments) {
                helper.addAttachment(attachment.toString(), attachment);
            }

            mailSender.send(message);

            logger.info("Mail has been sent to " + Arrays.asList(recipients));

            return true;
        }
        catch (Exception e) {
            logger.error("Error occured while sending mail to recipients " + Arrays.asList(recipients), e);
            return false;
        }
    }

    @Override
    public boolean sendMailWithoutAttachment(String subject, String content,
                                             String[] recipients) {
        if (!sendMail) {
            logger.info("Skipping mail with content: " + content);
            return true;
        }
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(templateMessage.getFrom());
            helper.setTo(recipients);
            helper.setSubject(subject);
            helper.setText(content,true);

            mailSender.send(message);

            logger.info("Mail has been sent to " + Arrays.asList(recipients));

            return true;
        }
        catch (Exception e) {
            logger.error("Error occured while sending mail to recipients " + Arrays.asList(recipients), e);
            return false;
        }
    }
}
