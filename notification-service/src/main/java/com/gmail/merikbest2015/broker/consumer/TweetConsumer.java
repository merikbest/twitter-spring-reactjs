package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.event.UpdateTweetEvent;
import com.gmail.merikbest2015.service.TweetHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.UPDATE_TWEET_TOPIC;

@Component
@RequiredArgsConstructor
public class TweetConsumer {

    private final TweetHandlerService tweetHandlerService;

    @KafkaListener(topics = UPDATE_TWEET_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void tweetUpdateListener(UpdateTweetEvent tweetEvent) {
        tweetHandlerService.handleUpdateTweet(tweetEvent);
    }
}
