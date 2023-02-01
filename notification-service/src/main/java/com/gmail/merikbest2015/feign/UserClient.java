package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.notification.NotificationUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_USER;

@FeignClient(name = "user-service", contextId = "UserClient", configuration = FeignConfiguration.class)
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

    @GetMapping(API_V1_USER + "/subscribers/ids")
    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    @GetMapping(API_V1_USER + "/subscribers/ids")
    List<Long> getUserIdsWhichUserSubscribed();
}
