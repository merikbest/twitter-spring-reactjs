package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_TAGS;
import static com.gmail.merikbest2015.constants.FeignConstants.TAG_SERVICE;

@FeignClient(value = TAG_SERVICE, configuration = FeignConfiguration.class)
public interface TagClient {

    @PostMapping(API_V1_TAGS + "/parse/{tweetId}")
    void parseHashtagsInText(@PathVariable("tweetId") Long tweetId, @RequestBody TweetTextRequest request);

    @DeleteMapping(API_V1_TAGS + "/delete/{tweetId}")
    void deleteTagsByTweetId(@PathVariable("tweetId") Long tweetId);
}
