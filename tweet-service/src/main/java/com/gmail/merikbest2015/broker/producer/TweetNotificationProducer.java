package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.event.TweetNotificationDto;
import com.gmail.merikbest2015.event.TweetNotificationEvent;
import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.SEND_SUBSCRIBER_NOTIFICATION_TOPIC;
import static com.gmail.merikbest2015.constants.KafkaTopicConstants.SEND_TWEET_NOTIFICATION_TOPIC;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class TweetNotificationProducer {

    private final KafkaTemplate<String, TweetNotificationEvent> tweetNotificationTemplate;
    private final KafkaTemplate<String, TweetSubscriberNotificationEvent> tweetSubscriberNotificationTemplate;

    public void sendTweetNotificationEvent(NotificationType type, Tweet tweet, User authUser, boolean notificationCondition) {
        ProducerRecord<String, TweetNotificationEvent> producerRecord = new ProducerRecord<>(
                SEND_TWEET_NOTIFICATION_TOPIC, toTweetNotificationEvent(type, tweet, authUser, notificationCondition));
        producerRecord.headers().add(AUTH_USER_ID_HEADER, authUser.getId().toString().getBytes());
        tweetNotificationTemplate.send(producerRecord);
    }

    public void sendTweetSubscriberNotificationEvent(Tweet tweet, User authUser) {
        tweetSubscriberNotificationTemplate.send(SEND_SUBSCRIBER_NOTIFICATION_TOPIC, toTweetSubscriberNotificationEvent(tweet, authUser));
    }

    private static TweetNotificationEvent toTweetNotificationEvent(NotificationType type, Tweet tweet, User authUser,
                                                                   boolean notificationCondition) {
        return TweetNotificationEvent.builder()
                .notificationType(type)
                .notificationCondition(notificationCondition)
                .notifiedUser(toUserDto(tweet.getAuthor()))
                .user(toUserDto(authUser))
                .tweet(toTweetDto(tweet))
                .build();
    }

    private static UserNotificationDto toUserDto(User user) {
        return UserNotificationDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }

    private static TweetNotificationDto toTweetDto(Tweet tweet) {
        return TweetNotificationDto.builder()
                .id(tweet.getId())
                .text(tweet.getText())
                .author(toUserDto(tweet.getAuthor()))
                .build();
    }

    private static TweetSubscriberNotificationEvent toTweetSubscriberNotificationEvent(Tweet tweet, User authUser) {
        return TweetSubscriberNotificationEvent.builder()
                .tweet(toTweetDto(tweet))
                .user(toUserDto(authUser))
                .build();
    }
}
