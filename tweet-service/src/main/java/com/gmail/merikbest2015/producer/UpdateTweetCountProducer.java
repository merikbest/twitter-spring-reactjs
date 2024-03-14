package com.gmail.merikbest2015.producer;

import com.gmail.merikbest2015.event.UpdateTweetCountEvent;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.*;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class UpdateTweetCountProducer {

    private final KafkaTemplate<String, UpdateTweetCountEvent> kafkaTemplate;

    public void sendUpdateTweetCountEvent(Long authUserId, boolean hasRetweeted) {
        kafkaTemplate.send(getUpdateTweetCountEvent(UPDATE_USER_TWEETS_COUNT_TOPIC, authUserId, hasRetweeted));
    }

    public void sendUpdateLikeTweetCountEvent(Long authUserId, boolean hasTweetLiked) {
        kafkaTemplate.send(getUpdateTweetCountEvent(UPDATE_USER_LIKES_COUNT_TOPIC, authUserId, hasTweetLiked));
    }

    public void sendUpdateMediaTweetCountEvent(Long authUserId, boolean hasTweetLiked) {
        kafkaTemplate.send(getUpdateTweetCountEvent(UPDATE_USER_MEDIA_COUNT_TOPIC, authUserId, hasTweetLiked));
    }

    private static ProducerRecord<String, UpdateTweetCountEvent> getUpdateTweetCountEvent(
            String topic,
            Long authUserId,
            boolean hasUpdateTweetsCount) {
        ProducerRecord<String, UpdateTweetCountEvent> producerRecord = new ProducerRecord<>(
                topic,
                new UpdateTweetCountEvent(hasUpdateTweetsCount));
        producerRecord.headers().add(AUTH_USER_ID_HEADER, authUserId.toString().getBytes());
        return producerRecord;
    }
}
