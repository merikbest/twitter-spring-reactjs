package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.event.TweetTagEvent;
import com.gmail.merikbest2015.service.TagHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TagConsumer {

    private final TagHandlerService tagHandlerService;

    @KafkaListener(topics = KafkaTopicConstants.PARSE_TWEETS_HASHTAG_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void parseHashtag(TweetTagEvent event) {
        tagHandlerService.parseHashtag(event.getTweetId(), event.getTweetText());
    }

    @KafkaListener(topics = KafkaTopicConstants.DELETE_TWEETS_HASHTAG_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void deleteTag(Long tweetId) {
        tagHandlerService.deleteTag(tweetId);
    }
}
