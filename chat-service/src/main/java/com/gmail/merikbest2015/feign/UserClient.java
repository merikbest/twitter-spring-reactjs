package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.ChatUserParticipantResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_USER;

@FeignClient(name = "user-service", contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/chat/participant/{userId}")
    ChatUserParticipantResponse getChatParticipant(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_user_blocked/{userId}")
    Boolean isUserBlockedByMyProfile(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_my_profile_blocked/{userId}")
    Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_exists/{userId}")
    Boolean isUserExists(@PathVariable("userId") Long userId);
}
