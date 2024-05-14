package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.event.TweetNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationEvent;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.SEND_TWEET_NOTIFICATION_TOPIC;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class TweetNotificationProducer {

    private final KafkaTemplate<String, TweetNotificationEvent> kafkaTemplate;

    public void sendTweetNotificationEvent(NotificationType type, Tweet tweet, User authUser, boolean notificationCondition) {
        ProducerRecord<String, TweetNotificationEvent> producerRecord = new ProducerRecord<>(
                SEND_TWEET_NOTIFICATION_TOPIC, toTweetNotificationEvent(type, tweet, authUser, notificationCondition));
        producerRecord.headers().add(AUTH_USER_ID_HEADER, authUser.getId().toString().getBytes());
        kafkaTemplate.send(producerRecord);
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

    private static UserNotificationEvent toUserDto(User user) {
        return UserNotificationEvent.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }

    private static TweetNotificationEvent.Tweet toTweetDto(Tweet tweet) {
        return TweetNotificationEvent.Tweet.builder()
                .id(tweet.getId())
                .text(tweet.getText())
                .author(toUserDto(tweet.getAuthor()))
                .build();
    }
}
