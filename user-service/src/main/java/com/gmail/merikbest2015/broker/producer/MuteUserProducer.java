package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.broker.util.ProducerUtil;
import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.event.MuteUserEvent;
import com.gmail.merikbest2015.mapper.ProducerMapper;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MuteUserProducer {

    private final KafkaTemplate<String, MuteUserEvent> kafkaTemplate;
    private final ProducerMapper producerMapper;

    public void sendMuteUserEvent(User user, Long authUserId, boolean hasUserMuted) {
        MuteUserEvent event = producerMapper.toMuteUserEvent(user, hasUserMuted);
        kafkaTemplate.send(ProducerUtil.authHeaderWrapper(KafkaTopicConstants.MUTE_USER_TOPIC, event, authUserId));
    }
}
