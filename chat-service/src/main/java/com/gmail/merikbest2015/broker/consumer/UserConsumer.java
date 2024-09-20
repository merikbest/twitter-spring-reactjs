package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.event.BlockUserEvent;
import com.gmail.merikbest2015.commons.event.FollowRequestUserEvent;
import com.gmail.merikbest2015.commons.event.FollowUserEvent;
import com.gmail.merikbest2015.commons.event.UpdateUserEvent;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConsumer {

    private final UserHandlerService userHandlerService;

    @KafkaListener(topics = KafkaTopicConstants.UPDATE_USER_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void userUpdateListener(UpdateUserEvent userEvent) {
        userHandlerService.handleNewOrUpdateUser(userEvent);
    }

    @KafkaListener(topics = KafkaTopicConstants.BLOCK_USER_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void userBlockListener(BlockUserEvent userEvent, @Header(PathConstants.AUTH_USER_ID_HEADER) String authId) {
        userHandlerService.handleBlockUser(userEvent, authId);
    }

    @KafkaListener(topics = KafkaTopicConstants.FOLLOW_USER_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void userFollowListener(FollowUserEvent userEvent, @Header(PathConstants.AUTH_USER_ID_HEADER) String authId) {
        userHandlerService.handleFollowUser(userEvent, authId);
    }

    @KafkaListener(topics = KafkaTopicConstants.FOLLOW_REQUEST_USER_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void userFollowRequestListener(FollowRequestUserEvent userEvent, @Header(PathConstants.AUTH_USER_ID_HEADER) String authId) {
        userHandlerService.handleFollowUserRequest(userEvent, authId);
    }
}
