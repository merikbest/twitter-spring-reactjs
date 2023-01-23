package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_NOTIFICATION;

@FeignClient(name = "notification-service", configuration = FeignConfiguration.class)
public interface NotificationClient {

    @GetMapping(API_V1_NOTIFICATION + "/tweet/{tweetId}")
    void sendTweetNotificationToSubscribers(@PathVariable("tweetId") Long tweetId);
}
