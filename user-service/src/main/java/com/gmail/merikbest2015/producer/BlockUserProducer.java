package com.gmail.merikbest2015.producer;

import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.BLOCK_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class BlockUserProducer {

    private final KafkaTemplate<String, BlockUserEvent> kafkaTemplate;

    public void sendBlockUserEvent(User user, boolean hasUserBlocked) {
        kafkaTemplate.send(BLOCK_USER_TOPIC, toBlockUserEvent(user, hasUserBlocked));
    }

    private static BlockUserEvent toBlockUserEvent(User user, boolean hasUserBlocked) {
        return BlockUserEvent.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .privateProfile(user.isPrivateProfile())
                .userBlocked(hasUserBlocked)
                .build();
    }
}
