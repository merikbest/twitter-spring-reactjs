package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.gmail.merikbest2015.constants.FeignConstants.TWEET_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.*;

@FeignClient(value = TWEET_SERVICE, path = API_V1_TWEETS, configuration = FeignConfiguration.class)
public interface TweetClient {

    @CircuitBreaker(name = TWEET_SERVICE)
    @GetMapping(ID_TWEET_ID)
    Boolean isTweetExists(@PathVariable("tweetId") Long tweetId);

    @CircuitBreaker(name = TWEET_SERVICE, fallbackMethod = "defaultTweetCount")
    @GetMapping(COUNT_TEXT)
    Long getTweetCountByText(@PathVariable("text") String text);

    default Long defaultTweetCount(Throwable throwable) {
        return 0L;
    }
}
