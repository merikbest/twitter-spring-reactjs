package com.gmail.merikbest2015.producer;

import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.UPDATE_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class UpdateUserProducer {

    private final KafkaTemplate<String, UpdateUserEvent> kafkaTemplate;

    public void sendUpdateUserEvent(User user) {
        kafkaTemplate.send(UPDATE_USER_TOPIC, toUpdateUserEvent(user));
    }

    private static UpdateUserEvent toUpdateUserEvent(User user) {
        return UpdateUserEvent.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .about(user.getAbout())
                .avatar(user.getAvatar())
                .privateProfile(user.isPrivateProfile())
                .active(user.isActive())
                .mutedDirectMessages(user.isMutedDirectMessages())
                .build();
    }
}
