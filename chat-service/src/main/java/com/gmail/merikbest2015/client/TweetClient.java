package com.gmail.merikbest2015.client;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.constants.FeignConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.dto.response.chat.ChatTweetResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CircuitBreaker(name = FeignConstants.TWEET_SERVICE)
@FeignClient(name = FeignConstants.TWEET_SERVICE, path = PathConstants.API_V1_TWEETS, configuration = FeignConfiguration.class)
public interface TweetClient {

    @GetMapping(PathConstants.ID_TWEET_ID)
    Boolean isTweetExists(@PathVariable("tweetId") Long tweetId);

    @GetMapping(PathConstants.CHAT_TWEET_ID)
    ChatTweetResponse getChatTweet(@PathVariable("tweetId") Long tweetId);
}
