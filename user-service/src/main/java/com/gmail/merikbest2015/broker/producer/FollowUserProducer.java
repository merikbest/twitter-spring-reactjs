package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.broker.util.ProducerUtil;
import com.gmail.merikbest2015.commons.event.FollowUserEvent;
import com.gmail.merikbest2015.mapper.ProducerMapper;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.FOLLOW_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class FollowUserProducer {

    private final KafkaTemplate<String, FollowUserEvent> kafkaTemplate;
    private final ProducerMapper producerMapper;

    public void sendFollowUserEvent(User user, Long authUserId, boolean hasUserFollowed) {
        FollowUserEvent event = producerMapper.toFollowUserEvent(user, hasUserFollowed);
        kafkaTemplate.send(ProducerUtil.authHeaderWrapper(FOLLOW_USER_TOPIC, event, authUserId));
    }
}
