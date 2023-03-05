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
import static com.gmail.merikbest2015.constants.PathConstants.API_V1_USER;

@CircuitBreaker(name = USER_SERVICE)
@FeignClient(name = USER_SERVICE, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/{userId}")
    UserResponse getUserById(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/notification/{userId}")
    void increaseNotificationsCount(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/notification/user/{userId}")
    NotificationUserResponse getNotificationUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/notification/reset")
    void resetNotificationCount();

    @GetMapping(API_V1_USER + "/subscribers/{userId}")
    List<Long> getSubscribersByUserId(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/subscribers")
    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    @GetMapping(API_V1_USER + "/subscribers/ids")
    List<Long> getUserIdsWhichUserSubscribed();
}
