package com.gmail.merikbest2015.client;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.constants.FeignConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.commons.dto.response.user.UserResponse;
import com.gmail.merikbest2015.commons.event.UpdateUserEvent;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CircuitBreaker(name = FeignConstants.USER_SERVICE)
@FeignClient(name = FeignConstants.USER_SERVICE, path = PathConstants.API_V1_USER, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(PathConstants.USER_ID)
    UserResponse getUserById(@PathVariable("userId") Long userId);

    @GetMapping(PathConstants.SUBSCRIBERS)
    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    @GetMapping(PathConstants.SUBSCRIBERS_IDS)
    List<Long> getUserIdsWhichUserSubscribed();

    @GetMapping(PathConstants.BATCH_USERS)
    List<UpdateUserEvent> getBatchUsers(@RequestParam("period") Integer period,
                                        @RequestParam("page") Integer page,
                                        @RequestParam("limit") Integer limit);
}
