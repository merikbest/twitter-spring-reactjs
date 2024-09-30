package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.event.TweetTagEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TagProducer {

    private final KafkaTemplate<String, TweetTagEvent> parseHashtagKafkaTemplate;
    private final KafkaTemplate<String, Long> deleteTagKafkaTemplate;

    public void parseHashtag(Long tweetId, String tweetText) {
        parseHashtagKafkaTemplate.send(KafkaTopicConstants.PARSE_TWEETS_HASHTAG_TOPIC, new TweetTagEvent(tweetId, tweetText));
    }

    public void deleteTag(Long tweetId) {
        deleteTagKafkaTemplate.send(KafkaTopicConstants.DELETE_TWEETS_HASHTAG_TOPIC, tweetId);
    }
}
