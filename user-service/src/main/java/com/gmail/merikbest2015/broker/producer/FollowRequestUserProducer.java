package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.broker.util.ProducerUtil;
import com.gmail.merikbest2015.event.FollowRequestUserEvent;
import com.gmail.merikbest2015.mapper.ProducerMapper;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.FOLLOW_REQUEST_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class FollowRequestUserProducer {

    private final KafkaTemplate<String, FollowRequestUserEvent> kafkaTemplate;
    private final ProducerMapper producerMapper;

    public void sendFollowRequestUserEvent(User user, Long authUserId, boolean hasUserFollowRequest) {
        FollowRequestUserEvent event = producerMapper.toFollowRequestUserEvent(user, hasUserFollowRequest);
        kafkaTemplate.send(ProducerUtil.authHeaderWrapper(FOLLOW_REQUEST_USER_TOPIC, event, authUserId));
    }
}
