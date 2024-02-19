package com.gmail.merikbest2015.consumer;

import com.gmail.merikbest2015.event.UserEvent;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaConstants.UPDATE_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class UserConsumer {

    private final UserService userService;

    @KafkaListener(topics = UPDATE_USER_TOPIC, groupId = "topic", containerFactory = "kafkaListenerContainerFactory")
    public void userUpdateListener(UserEvent userEvent) {
        userService.handleUser(userEvent);
    }
}
