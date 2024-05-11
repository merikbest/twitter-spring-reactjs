package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.CREATE_LISTS_NOTIFICATION_TOPIC;
import static com.gmail.merikbest2015.constants.KafkaTopicConstants.CREATE_USER_NOTIFICATION_TOPIC;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationHandlerService notificationHandlerService;

    @KafkaListener(topics = CREATE_LISTS_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void listsNotificationListener(ListsNotificationEvent listsNotificationEvent) {
        notificationHandlerService.handleListsNotification(listsNotificationEvent);
    }

    @KafkaListener(topics = CREATE_USER_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void followUserNotificationListener(FollowUserNotificationEvent followUserNotificationEvent) {
        notificationHandlerService.handleFollowUserNotification(followUserNotificationEvent);
    }
}
