package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.SEND_USER_NOTIFICATION_TOPIC;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class FollowUserNotificationProducer {

    private final KafkaTemplate<String, FollowUserNotificationEvent> kafkaTemplate;

    public void sendFollowUserNotificationEvent(User authUser, User notifiedUser) {
        ProducerRecord<String, FollowUserNotificationEvent> producerRecord = new ProducerRecord<>(
                SEND_USER_NOTIFICATION_TOPIC, toUserNotificationEvent(notifiedUser, authUser));
        producerRecord.headers().add(AUTH_USER_ID_HEADER, authUser.getId().toString().getBytes());
        kafkaTemplate.send(producerRecord);
    }

    private static FollowUserNotificationEvent toUserNotificationEvent(User authUser, User notifiedUser) {
        return FollowUserNotificationEvent.builder()
                .user(toUserDto(authUser))
                .userToFollow(toUserDto(notifiedUser))
                .notifiedUser(toUserDto(notifiedUser))
                .build();
    }

    private static UserNotificationDto toUserDto(User user) {
        return UserNotificationDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }
}
