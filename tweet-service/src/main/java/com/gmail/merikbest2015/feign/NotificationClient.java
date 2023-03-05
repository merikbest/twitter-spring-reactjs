package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.constants.FeignConstants.NOTIFICATION_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.API_V1_NOTIFICATION;

@CircuitBreaker(name = NOTIFICATION_SERVICE)
@FeignClient(name = NOTIFICATION_SERVICE, configuration = FeignConfiguration.class)
public interface NotificationClient {

    @PostMapping(API_V1_NOTIFICATION + "/tweet")
    NotificationResponse sendTweetNotification(@RequestBody NotificationRequest request);

    @GetMapping(API_V1_NOTIFICATION + "/tweet/{tweetId}")
    void sendTweetNotificationToSubscribers(@PathVariable("tweetId") Long tweetId);
}
