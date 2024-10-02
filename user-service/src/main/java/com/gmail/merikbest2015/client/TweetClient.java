package com.gmail.merikbest2015.client;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.constants.FeignConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = FeignConstants.TWEET_SERVICE, path = PathConstants.API_V1_TWEETS, configuration = FeignConfiguration.class)
public interface TweetClient {

    @CircuitBreaker(name = FeignConstants.TWEET_SERVICE)
    @GetMapping(PathConstants.ID_TWEET_ID)
    Boolean isTweetExists(@PathVariable("tweetId") Long tweetId);

    @CircuitBreaker(name = FeignConstants.TWEET_SERVICE, fallbackMethod = "defaultTweetCount")
    @GetMapping(PathConstants.COUNT_TEXT)
    Long getTweetCountByText(@PathVariable("text") String text);

    default Long defaultTweetCount(Throwable throwable) {
        return 0L;
    }
}
