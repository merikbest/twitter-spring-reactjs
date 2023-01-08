package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.client.user.UserIdsRequest;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import com.gmail.merikbest2015.service.UserClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.commons.controller.PathConstants.API_V1_USER;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_USER)
public class UserApiController {

    private final UserClientService userService;

    @GetMapping("/{userId}")
    public Optional<User> getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/ids")
    public List<User> getUsersByIds(@RequestBody UserIdsRequest request) {
        return userService.getUsersByIds(request);
    }

    @GetMapping("/ids")
    public List<Long> getUserFollowersIds() {
        return userService.getUserFollowersIds();
    }

    @GetMapping("/search/{username}")
    public Page<UserChatProjection> searchUsersByUsername(@PathVariable("username") String username, Pageable pageable) {
        return userService.searchUsersByUsername(username, pageable);
    }

    @GetMapping("/valid/{userId}/{authUserId}")
    public User getValidUser(@PathVariable("userId") Long userId, @PathVariable("authUserId") Long authUserId) {
        return userService.getValidUser(userId, authUserId);
    }

    @GetMapping("/is_followed/{userId}")
    public Boolean isUserFollowByOtherUser(@PathVariable("userId") Long userId) {
        return userService.isUserFollowByOtherUser(userId);
    }

    @GetMapping("/is_muted/{userId}")
    public Boolean isUserMutedByMyProfile(@PathVariable("userId") Long userId) {
        return userService.isUserMutedByMyProfile(userId);
    }

    @GetMapping("/is_blocked/{userId}/{blockedUserId}")
    public Boolean isUserBlocked(@PathVariable("userId") Long userId, @PathVariable("blockedUserId") Long blockedUserId) {
        return userService.isUserBlocked(userId, blockedUserId);
    }

    @GetMapping("/is_user_blocked/{userId}")
    public Boolean isUserBlockedByMyProfile(@PathVariable("userId") Long userId) {
        return userService.isUserBlockedByMyProfile(userId);
    }

    @GetMapping("/is_my_profile_blocked/{userId}")
    public Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId) {
        return userService.isMyProfileBlockedByUser(userId);
    }

    @GetMapping("/is_approved/{userId}")
    public Boolean isMyProfileWaitingForApprove(@PathVariable("userId") Long userId) {
        return userService.isMyProfileWaitingForApprove(userId);
    }

    @GetMapping("/notification/{userId}")
    public void increaseNotificationsCount(@PathVariable("userId") Long userId) {
        userService.increaseNotificationsCount(userId);
    }

    @PostMapping
    public void saveUser(@RequestBody User user) {
        userService.saveUser(user);
    }
}
