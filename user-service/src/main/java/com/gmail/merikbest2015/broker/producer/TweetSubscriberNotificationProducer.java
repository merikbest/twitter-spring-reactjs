package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.mapper.ProducerMapper;
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
    private final ProducerMapper producerMapper;

    public void sendTweetSubscriberNotificationEvent(TweetSubscriberNotificationEvent notificationEvent, List<User> subscribers) {
        TweetSubscriberNotificationEvent event = producerMapper.toTweetSubscriberNotificationEvent(notificationEvent, subscribers);
        kafkaTemplate.send(SEND_TWEET_SUBSCRIBER_NOTIFICATION_TOPIC, event);
    }
}
