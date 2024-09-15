package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.commons.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.mapper.ProducerMapper;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.SEND_USER_NOTIFICATION_TOPIC;

@Component
@RequiredArgsConstructor
public class FollowUserNotificationProducer {

    private final KafkaTemplate<String, FollowUserNotificationEvent> kafkaTemplate;
    private final ProducerMapper producerMapper;

    public void sendFollowUserNotificationEvent(User authUser, User notifiedUser) {
        FollowUserNotificationEvent event = producerMapper.toUserNotificationEvent(authUser, notifiedUser);
        kafkaTemplate.send(SEND_USER_NOTIFICATION_TOPIC, event);
    }
}
