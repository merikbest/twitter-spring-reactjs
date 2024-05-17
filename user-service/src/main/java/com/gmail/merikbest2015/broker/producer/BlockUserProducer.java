package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.broker.util.ProducerUtil;
import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.mapper.ProducerMapper;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.BLOCK_USER_TOPIC;

@Component
@RequiredArgsConstructor
public class BlockUserProducer {

    private final KafkaTemplate<String, BlockUserEvent> kafkaTemplate;
    private final ProducerMapper producerMapper;

    public void sendBlockUserEvent(User user, Long authUserId, boolean hasUserBlocked) {
        BlockUserEvent event = producerMapper.toBlockUserEvent(user, hasUserBlocked);
        kafkaTemplate.send(ProducerUtil.authHeaderWrapper(BLOCK_USER_TOPIC, event, authUserId));
    }
}
