package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.SendEmailEvent;

public interface EmailService {
    void sendEmail(SendEmailEvent emailEvent);
}
