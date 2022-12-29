package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.EmailRequest;

import javax.mail.MessagingException;

public interface EmailService {
    void sendMessageHtml(EmailRequest emailRequest) throws MessagingException;
}
