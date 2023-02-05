package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_TWEETS;
import static com.gmail.merikbest2015.constants.FeignConstants.TWEET_SERVICE;

@FeignClient(name = TWEET_SERVICE, configuration = FeignConfiguration.class)
public interface TweetClient {

    @GetMapping(API_V1_TWEETS + "/{tweetId}")
    TweetResponse getTweetById(@PathVariable("tweetId") Long tweetId);

    @GetMapping(API_V1_TWEETS + "/notification/{tweetId}")
    NotificationTweetResponse getNotificationTweet(@PathVariable("tweetId") Long tweetId);

    @PostMapping(API_V1_TWEETS + "/ids")
    HeaderResponse<TweetResponse> getTweetsByIds(@RequestBody IdsRequest idsRequest, @SpringQueryMap Pageable pageable);
}
