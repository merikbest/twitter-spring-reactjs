package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.event.TweetTagEvent;
import com.gmail.merikbest2015.service.TagHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.DELETE_TWEETS_HASHTAG_TOPIC;
import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.PARSE_TWEETS_HASHTAG_TOPIC;

@Component
@RequiredArgsConstructor
public class TagConsumer {

    private final TagHandlerService tagHandlerService;

    @KafkaListener(topics = PARSE_TWEETS_HASHTAG_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void parseHashtag(TweetTagEvent event) {
        tagHandlerService.parseHashtag(event.getTweetId(), event.getTweetText());
    }

    @KafkaListener(topics = DELETE_TWEETS_HASHTAG_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void deleteTag(Long tweetId) {
        tagHandlerService.deleteTag(tweetId);
    }
}
