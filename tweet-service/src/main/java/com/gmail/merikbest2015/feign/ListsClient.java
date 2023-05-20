package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.gmail.merikbest2015.constants.FeignConstants.LISTS_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.API_V1_LISTS;
import static com.gmail.merikbest2015.constants.PathConstants.TWEET_LIST_ID;

@FeignClient(value = LISTS_SERVICE, path = API_V1_LISTS, configuration = FeignConfiguration.class)
public interface ListsClient {

    @CircuitBreaker(name = LISTS_SERVICE, fallbackMethod = "defaultEmptyTweetList")
    @GetMapping(TWEET_LIST_ID)
    TweetListResponse getTweetList(@PathVariable("listId") Long listId);

    default TweetListResponse defaultEmptyTweetList(Throwable throwable) {
        return new TweetListResponse();
    }
}
