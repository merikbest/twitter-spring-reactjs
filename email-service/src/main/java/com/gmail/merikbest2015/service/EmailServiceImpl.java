package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.event.SendEmailEvent;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine thymeleafTemplateEngine;

    @Value("${spring.mail.username}")
    private String username;

    @Override
    @SneakyThrows
    public void sendEmail(SendEmailEvent emailEvent) {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(emailEvent.getAttributes());
        String htmlBody = thymeleafTemplateEngine.process(emailEvent.getTemplate(), thymeleafContext);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(username);
        helper.setTo(emailEvent.getToEmail());
        helper.setSubject(emailEvent.getSubject());
        helper.setText(htmlBody, true);
        mailSender.send(message);
    }
}
