package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.TweetNotificationEvent;
import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.*;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationHandlerService notificationHandlerService;

    @KafkaListener(topics = SEND_LISTS_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void listsNotificationListener(ListsNotificationEvent event, @Header(AUTH_USER_ID_HEADER) String authId) {
        notificationHandlerService.handleListsNotification(event, authId);
    }

    @KafkaListener(topics = SEND_USER_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void followUserNotificationListener(FollowUserNotificationEvent event, @Header(AUTH_USER_ID_HEADER) String authId) {
        notificationHandlerService.handleFollowUserNotification(event, authId);
    }

    @KafkaListener(topics = SEND_TWEET_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetNotificationListener(TweetNotificationEvent event, @Header(AUTH_USER_ID_HEADER) String authId) {
        notificationHandlerService.handleTweetNotification(event, authId);
    }

    @KafkaListener(topics = SEND_TWEET_SUBSCRIBER_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetSubscriberNotificationListener(TweetSubscriberNotificationEvent event) {
        notificationHandlerService.tweetSubscriberNotification(event);
    }
}
