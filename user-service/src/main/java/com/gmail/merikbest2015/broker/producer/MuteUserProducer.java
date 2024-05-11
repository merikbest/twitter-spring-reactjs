package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.event.MuteUserEvent;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.MUTE_USER_TOPIC;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class MuteUserProducer {

    private final KafkaTemplate<String, MuteUserEvent> kafkaTemplate;

    public void sendMuteUserEvent(User user, Long authUserId, boolean hasUserMuted) {
        ProducerRecord<String, MuteUserEvent> producerRecord = new ProducerRecord<>(MUTE_USER_TOPIC, toMuteUserEvent(user, hasUserMuted));
        producerRecord.headers().add(AUTH_USER_ID_HEADER, authUserId.toString().getBytes());
        kafkaTemplate.send(producerRecord);
    }

    private static MuteUserEvent toMuteUserEvent(User user, boolean hasUserMuted) {
        return MuteUserEvent.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .about(user.getAbout())
                .avatar(user.getAvatar())
                .privateProfile(user.isPrivateProfile())
                .active(user.isActive())
                .mutedDirectMessages(user.isMutedDirectMessages())
                .userMuted(hasUserMuted)
                .build();
    }
}
