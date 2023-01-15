package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.TweetResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TWEETS;

@FeignClient(value = "tweet-service", configuration = FeignConfiguration.class)
public interface TweetClient {

    @GetMapping(API_V1_TWEETS + "/ids/{tweetIds}")
    List<TweetResponse> getTweetsByIds(@PathVariable("tweetIds") List<Long> tweetIds);
}
