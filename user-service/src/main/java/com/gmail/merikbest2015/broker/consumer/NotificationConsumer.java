package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.service.UserNotificationHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.*;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final UserNotificationHandlerService userNotificationHandlerService;

    @KafkaListener(topics = UPDATE_USER_NOTIFICATIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void increaseNotificationsCount(Long notifiedUserEventId) {
        userNotificationHandlerService.increaseNotificationsCount(notifiedUserEventId);
    }

    @KafkaListener(topics = UPDATE_USER_MENTIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void increaseMentionsCount(Long notifiedUserEventId) {
        userNotificationHandlerService.increaseMentionsCount(notifiedUserEventId);
    }

    @KafkaListener(topics = RESET_USER_NOTIFICATIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void resetNotificationCount(Long notifiedUserEventId) {
        userNotificationHandlerService.resetNotificationCount(notifiedUserEventId);
    }

    @KafkaListener(topics = RESET_USER_MENTIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void resetMentionCount(Long notifiedUserEventId) {
        userNotificationHandlerService.resetMentionCount(notifiedUserEventId);
    }
}
