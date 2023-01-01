package com.gmail.merikbest2015.client.user;

import com.gmail.merikbest2015.models.User;
import com.gmail.merikbest2015.projection.UserChatProjection;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@FeignClient("user-service")
public interface UserClient {

    @GetMapping("/api/v1/user/{userId}")
    Optional<User> getUserById(@PathVariable Long userId);

    @PostMapping("/api/v1/user/ids")
    List<User> getUsersByIds(@RequestBody UserIdsRequest request);

    @GetMapping("/api/v1/user/ids")
    List<Long> getUserFollowersIds();

    @GetMapping("/api/v1/user/search/{username}")
    Page<UserChatProjection> searchUsersByUsername(@PathVariable String username, Pageable pageable);

    @GetMapping("/api/v1/user/valid/{userId}/{authUserId}")
    Optional<User> getValidUser(@PathVariable Long userId, @PathVariable Long authUserId);

    @GetMapping("/api/v1/user/is_blocked/{userId}/{supposedBlockedUserId}")
    Boolean isUserBlocked(@PathVariable Long userId, @PathVariable Long supposedBlockedUserId);

    @GetMapping("/api/v1/user/is_user_blocked/{userId}")
    Boolean isUserBlockedByMyProfile(@PathVariable Long userId);

    @GetMapping("/api/v1/user/is_my_profile_blocked/{userId}")
    Boolean isMyProfileBlockedByUser(@PathVariable Long userId);

    @PostMapping("/api/v1/user")
    void saveUser(User user);
}
