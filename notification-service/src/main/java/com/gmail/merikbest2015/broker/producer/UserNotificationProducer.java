package com.gmail.merikbest2015.broker.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.*;

@Component
@RequiredArgsConstructor
public class UserNotificationProducer {

    private final KafkaTemplate<String, Long> kafkaTemplate;

    public void increaseNotificationsCount(Long userId) {
        kafkaTemplate.send(UPDATE_USER_NOTIFICATIONS_COUNT_TOPIC, userId);
    }

    public void increaseMentionsCount(Long userId) {
        kafkaTemplate.send(UPDATE_USER_MENTIONS_COUNT_TOPIC, userId);
    }

    public void resetNotificationCount(Long userId) {
        kafkaTemplate.send(RESET_USER_NOTIFICATIONS_COUNT_TOPIC, userId);
    }

    public void resetMentionCount(Long userId) {
        kafkaTemplate.send(RESET_USER_MENTIONS_COUNT_TOPIC, userId);
    }
}
