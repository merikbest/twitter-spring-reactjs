package com.gmail.merikbest2015.consumer;

import com.gmail.merikbest2015.commons.event.SendEmailEvent;
import com.gmail.merikbest2015.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.SEND_EMAIL_TOPIC;

@Component
@RequiredArgsConstructor
public class EmailConsumer {

    private final EmailService emailService;

    @KafkaListener(topics = SEND_EMAIL_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void sendEmailListener(SendEmailEvent sendEmailEvent) {
        emailService.sendEmail(sendEmailEvent);
    }
}
