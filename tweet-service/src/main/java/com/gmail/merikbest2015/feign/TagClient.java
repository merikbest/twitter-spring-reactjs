package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.constants.FeignConstants.TAG_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.*;

@CircuitBreaker(name = TAG_SERVICE)
@FeignClient(value = TAG_SERVICE, path = API_V1_TAGS, configuration = FeignConfiguration.class)
public interface TagClient {

    @PostMapping(PARSE_TWEET_ID)
    void parseHashtagsFromText(@PathVariable("tweetId") Long tweetId, @RequestBody TweetTextRequest request);

    @DeleteMapping(DELETE_TWEET_ID)
    void deleteTagsByTweetId(@PathVariable("tweetId") Long tweetId);
}
