package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.SEND_TWEET_SUBSCRIBER_NOTIFICATION_TOPIC;

@Component
@RequiredArgsConstructor
public class TweetSubscriberNotificationProducer {

    private final KafkaTemplate<String, TweetSubscriberNotificationEvent> kafkaTemplate;

    public void sendTweetSubscriberNotificationEvent(TweetSubscriberNotificationEvent event, List<User> subscribers) {
        kafkaTemplate.send(SEND_TWEET_SUBSCRIBER_NOTIFICATION_TOPIC, toTweetSubscriberNotificationEvent(event, subscribers));
    }

    private static TweetSubscriberNotificationEvent toTweetSubscriberNotificationEvent(
            TweetSubscriberNotificationEvent event,
            List<User> subscribers) {
        List<UserNotificationDto> subscribersDto = subscribers.stream()
                .map(TweetSubscriberNotificationProducer::toUserDto)
                .toList();
        event.setSubscribers(subscribersDto);
        return event;
    }

    private static UserNotificationDto toUserDto(User user) {
        return UserNotificationDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }
}
