package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.event.UpdateTweetEvent;
import com.gmail.merikbest2015.service.TweetHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TweetConsumer {

    private final TweetHandlerService tweetHandlerService;

    @KafkaListener(topics = KafkaTopicConstants.UPDATE_TWEET_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetUpdateListener(UpdateTweetEvent tweetEvent) {
        tweetHandlerService.handleUpdateTweet(tweetEvent);
    }
}
