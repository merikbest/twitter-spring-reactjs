package com.gmail.merikbest2015.consumer;

import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.*;

@Component
@RequiredArgsConstructor
public class UserConsumer {

    private final UserService userService;

    @KafkaListener(topics = UPDATE_USER_TOPIC, groupId = "topic")
    public void userUpdateListener(UpdateUserEvent updateUserEvent) {
        userService.handleUpdateUser(updateUserEvent);
    }

    @KafkaListener(topics = BLOCK_USER_TOPIC, groupId = "topic")
    public void userBlockListener(BlockUserEvent blockUserEvent) {
        // TODO update BlockUserEvent
//        userService.handleBlockUser(blockUserEvent);
    }
}
