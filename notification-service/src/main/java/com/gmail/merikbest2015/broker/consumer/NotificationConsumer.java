package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.event.*;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.*;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationHandlerService notificationHandlerService;

    @KafkaListener(topics = SEND_LISTS_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void listsNotificationListener(ListsNotificationEvent notificationEvent) {
        notificationHandlerService.handleListsNotification(notificationEvent);
    }

    @KafkaListener(topics = SEND_USER_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void followUserNotificationListener(FollowUserNotificationEvent notificationEvent) {
        notificationHandlerService.handleFollowUserNotification(notificationEvent);
    }

    @KafkaListener(topics = SEND_TWEET_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetNotificationListener(TweetNotificationEvent notificationEvent) {
        notificationHandlerService.handleTweetNotification(notificationEvent);
    }

    @KafkaListener(topics = SEND_TWEET_SUBSCRIBER_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetSubscriberNotificationListener(TweetSubscriberNotificationEvent notificationEvent) {
        notificationHandlerService.handleTweetSubscriberNotification(notificationEvent);
    }

    @KafkaListener(topics = SEND_TWEET_MENTION_NOTIFICATION_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetMentionNotificationListener(TweetMentionNotificationEvent notificationEvent) {
        notificationHandlerService.handleTweetMentionNotification(notificationEvent);
    }
}
