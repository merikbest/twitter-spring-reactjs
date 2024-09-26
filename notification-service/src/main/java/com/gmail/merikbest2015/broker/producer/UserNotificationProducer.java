package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserNotificationProducer {

    private final KafkaTemplate<String, Long> kafkaTemplate;

    public void increaseNotificationsCount(Long userId) {
        kafkaTemplate.send(KafkaTopicConstants.UPDATE_USER_NOTIFICATIONS_COUNT_TOPIC, userId);
    }

    public void increaseMentionsCount(Long userId) {
        kafkaTemplate.send(KafkaTopicConstants.UPDATE_USER_MENTIONS_COUNT_TOPIC, userId);
    }

    public void resetNotificationCount(Long userId) {
        kafkaTemplate.send(KafkaTopicConstants.RESET_USER_NOTIFICATIONS_COUNT_TOPIC, userId);
    }

    public void resetMentionCount(Long userId) {
        kafkaTemplate.send(KafkaTopicConstants.RESET_USER_MENTIONS_COUNT_TOPIC, userId);
    }
}
