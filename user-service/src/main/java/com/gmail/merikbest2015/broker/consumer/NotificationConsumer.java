package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.service.UserNotificationHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.*;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final UserNotificationHandlerService userNotificationHandlerService;

    @KafkaListener(topics = UPDATE_USER_NOTIFICATIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void increaseNotificationsCountListener(Long notifiedUserEventId) {
        userNotificationHandlerService.increaseNotificationsCount(notifiedUserEventId);
    }

    @KafkaListener(topics = UPDATE_USER_MENTIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void increaseMentionsCountListener(Long notifiedUserEventId) {
        userNotificationHandlerService.increaseMentionsCount(notifiedUserEventId);
    }

    @KafkaListener(topics = RESET_USER_NOTIFICATIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void resetNotificationCountListener(Long notifiedUserEventId) {
        userNotificationHandlerService.resetNotificationCount(notifiedUserEventId);
    }

    @KafkaListener(topics = RESET_USER_MENTIONS_COUNT_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void resetMentionCountListener(Long notifiedUserEventId) {
        userNotificationHandlerService.resetMentionCount(notifiedUserEventId);
    }

    @KafkaListener(topics = SEND_SUBSCRIBER_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void processSubscriberNotificationListener(TweetSubscriberNotificationEvent event) {
        userNotificationHandlerService.processSubscriberNotificationListener(event);
    }
}
