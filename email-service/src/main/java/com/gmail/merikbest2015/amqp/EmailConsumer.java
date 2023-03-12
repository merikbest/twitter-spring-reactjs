package com.gmail.merikbest2015.amqp;

import com.gmail.merikbest2015.dto.request.EmailRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailConsumer {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine thymeleafTemplateEngine;

    @Value("${spring.mail.username}")
    private String username;

    @SneakyThrows
    @RabbitListener(queues = "${rabbitmq.queues.mail}")
    public void sendMessageHtml(EmailRequest emailRequest) {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(emailRequest.getAttributes());
        String htmlBody = thymeleafTemplateEngine.process(emailRequest.getTemplate(), thymeleafContext);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(username);
        helper.setTo(emailRequest.getTo());
        helper.setSubject(emailRequest.getSubject());
        helper.setText(htmlBody, true);
        mailSender.send(message);
    }
}
