package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.UPDATE_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class UserConsumer {

    private final UserHandlerService userHandlerService;

    @KafkaListener(topics = UPDATE_USER_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void userUpdateListener(UpdateUserEvent userEvent) {
        userHandlerService.handleNewOrUpdateUser(userEvent);
    }
}
