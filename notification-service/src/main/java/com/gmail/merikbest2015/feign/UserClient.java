package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.*;

@CircuitBreaker(name = USER_SERVICE)
@FeignClient(name = USER_SERVICE, path = API_V1_USER, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(USER_ID)
    UserResponse getUserById(@PathVariable("userId") Long userId);

    @GetMapping(NOTIFICATION_USER_ID)
    void increaseNotificationsCount(@PathVariable("userId") Long userId);

    @GetMapping(MENTION_USER_ID)
    void increaseMentionsCount(@PathVariable("userId") Long userId);

    @GetMapping(NOTIFICATION_USER_USER_ID)
    NotificationUserResponse getNotificationUser(@PathVariable("userId") Long userId);

    @GetMapping(NOTIFICATION_RESET)
    void resetNotificationCount();

    @GetMapping(MENTION_RESET)
    void resetMentionCount();

    @GetMapping(SUBSCRIBERS_USER_ID)
    List<Long> getSubscribersByUserId(@PathVariable("userId") Long userId);

    @GetMapping(SUBSCRIBERS)
    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    @GetMapping(SUBSCRIBERS_IDS)
    List<Long> getUserIdsWhichUserSubscribed();
}
