package com.gmail.merikbest2015.client.user;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.commons.projection.UserChatProjection;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.commons.controller.PathConstants.API_V1_USER;

@FeignClient(name = "user-service", contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/{userId}")
    Optional<User> getUserById(@PathVariable("userId") Long userId);

    @PostMapping(API_V1_USER + "/ids")
    List<User> getUsersByIds(@RequestBody UserIdsRequest request);

    @GetMapping(API_V1_USER + "/ids")
    List<Long> getUserFollowersIds();

    @GetMapping(API_V1_USER + "/search/{username}")
    Page<UserChatProjection> searchUsersByUsername(@PathVariable("username") String username, Pageable pageable);

    @GetMapping(API_V1_USER + "/valid/{userId}/{authUserId}")
    Optional<User> getValidUser(@PathVariable("userId") Long userId, @PathVariable("authUserId") Long authUserId);

    @GetMapping(API_V1_USER + "/is_followed/{userId}")
    Boolean isUserFollowByOtherUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_muted/{userId}")
    Boolean isUserMutedByMyProfile(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_blocked/{userId}/{supposedBlockedUserId}")
    Boolean isUserBlocked(@PathVariable("userId") Long userId, @PathVariable("supposedBlockedUserId") Long supposedBlockedUserId);

    @GetMapping(API_V1_USER + "/is_user_blocked/{userId}")
    Boolean isUserBlockedByMyProfile(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_my_profile_blocked/{userId}")
    Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_approved/{userId}")
    Boolean isMyProfileWaitingForApprove(@PathVariable("userId") Long userId);

    @PostMapping(API_V1_USER)
    void saveUser(@RequestBody User user);
}
