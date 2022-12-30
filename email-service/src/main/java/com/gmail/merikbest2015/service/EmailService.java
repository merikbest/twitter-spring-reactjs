package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.client.email.EmailRequest;

import javax.mail.MessagingException;

public interface EmailService {
    void sendMessageHtml(EmailRequest emailRequest) throws MessagingException;
}
