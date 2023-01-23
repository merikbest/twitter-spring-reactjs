package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TAGS;

@FeignClient(value = "tag-service", configuration = FeignConfiguration.class)
public interface TagClient {

    @GetMapping(API_V1_TAGS + "/parse/{text}/{tweetId}")
    void parseHashtagsInText(@PathVariable("text") String text, @PathVariable("tweetId") Long tweetId);

    @DeleteMapping(API_V1_TAGS + "/delete/{tweetId}")
    void deleteTagsByTweetId(@PathVariable("tweetId") Long tweetId);
}
