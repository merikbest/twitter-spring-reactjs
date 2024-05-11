package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationEvent;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.CREATE_USER_NOTIFICATION_TOPIC;

@Component
@RequiredArgsConstructor
public class FollowUserNotificationProducer {

    private final KafkaTemplate<String, FollowUserNotificationEvent> kafkaTemplate;

    public void sendFollowUserNotificationEvent(User authUser, User notifiedUser) {
        kafkaTemplate.send(CREATE_USER_NOTIFICATION_TOPIC, toUserNotificationEvent(notifiedUser, authUser));
    }

    private static FollowUserNotificationEvent toUserNotificationEvent(User authUser, User notifiedUser) {
        return FollowUserNotificationEvent.builder()
                .user(toUserDto(authUser))
                .userToFollow(toUserDto(notifiedUser))
                .notifiedUser(toUserDto(notifiedUser))
                .build();
    }

    private static UserNotificationEvent toUserDto(User user) {
        return UserNotificationEvent.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }
}
