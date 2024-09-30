package com.gmail.merikbest2015.client;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.constants.FeignConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.dto.response.tweet.TweetListResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = FeignConstants.LISTS_SERVICE, path = PathConstants.API_V1_LISTS, configuration = FeignConfiguration.class)
public interface ListsClient {

    @CircuitBreaker(name = FeignConstants.LISTS_SERVICE, fallbackMethod = "defaultEmptyTweetList")
    @GetMapping(PathConstants.TWEET_LIST_ID)
    TweetListResponse getTweetList(@PathVariable("listId") Long listId);

    default TweetListResponse defaultEmptyTweetList(Throwable throwable) {
        return new TweetListResponse();
    }
}
