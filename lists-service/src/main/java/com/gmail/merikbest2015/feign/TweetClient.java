package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TWEETS;

@FeignClient(value = "tweet-service", configuration = FeignConfiguration.class)
public interface TweetClient {

    @PostMapping(API_V1_TWEETS + "/user/ids")
    HeaderResponse<TweetResponse> getTweetsByUserIds(@RequestBody IdsRequest request,
                                                     @SpringQueryMap Pageable pageable);
}
