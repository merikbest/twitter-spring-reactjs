package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_USER;
import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;

@FeignClient(name = USER_SERVICE, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/chat/participant/{userId}")
    ChatUserParticipantResponse getChatParticipant(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_user_blocked/{userId}")
    Boolean isUserBlockedByMyProfile(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_my_profile_blocked/{userId}")
    Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_exists/{userId}")
    Boolean isUserExists(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/{userId}")
    UserResponse getUserResponseById(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/search/{username}")
    HeaderResponse<UserChatResponse> searchUsersByUsername(@PathVariable("username") String username,
                                                           @SpringQueryMap Pageable pageable);

    @PostMapping(API_V1_USER + "/chat/valid/ids")
    List<Long> validateChatUsersIds(@RequestBody IdsRequest request);
}
