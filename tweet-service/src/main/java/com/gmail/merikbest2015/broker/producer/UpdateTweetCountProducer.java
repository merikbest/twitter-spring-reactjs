package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.event.UpdateTweetCountEvent;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UpdateTweetCountProducer {

    private final KafkaTemplate<String, UpdateTweetCountEvent> kafkaTemplate;

    public void sendUpdateTweetCountEvent(Long authUserId, boolean hasRetweeted) {
        kafkaTemplate.send(getUpdateTweetCountEvent(KafkaTopicConstants.UPDATE_USER_TWEETS_COUNT_TOPIC, authUserId, hasRetweeted));
    }

    public void sendUpdateLikeTweetCountEvent(Long authUserId, boolean hasTweetLiked) {
        kafkaTemplate.send(getUpdateTweetCountEvent(KafkaTopicConstants.UPDATE_USER_LIKES_COUNT_TOPIC, authUserId, hasTweetLiked));
    }

    public void sendUpdateMediaTweetCountEvent(Long authUserId, boolean hasTweetLiked) {
        kafkaTemplate.send(getUpdateTweetCountEvent(KafkaTopicConstants.UPDATE_USER_MEDIA_COUNT_TOPIC, authUserId, hasTweetLiked));
    }

    private static ProducerRecord<String, UpdateTweetCountEvent> getUpdateTweetCountEvent(
            String topic,
            Long authUserId,
            boolean hasUpdateTweetsCount) {
        ProducerRecord<String, UpdateTweetCountEvent> producerRecord = new ProducerRecord<>(
                topic,
                new UpdateTweetCountEvent(hasUpdateTweetsCount));
        producerRecord.headers().add(PathConstants.AUTH_USER_ID_HEADER, authUserId.toString().getBytes());
        return producerRecord;
    }
}
