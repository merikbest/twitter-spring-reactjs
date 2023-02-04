package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.TweetResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TWEETS;

@FeignClient(value = "tweet-service", configuration = FeignConfiguration.class)
public interface TweetClient {

    @PostMapping(API_V1_TWEETS + "/tag/ids")
    List<TweetResponse> getTweetsByIds(@RequestBody IdsRequest requests);
}
