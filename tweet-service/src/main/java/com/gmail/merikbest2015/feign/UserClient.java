package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.TweetAdditionalInfoUserResponse;
import com.gmail.merikbest2015.dto.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.lists.UserIdsRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_USER;

@FeignClient(name = "user-service", contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/is_followed/{userId}")
    Boolean isUserFollowByOtherUser(@PathVariable("userId") Long userId);

//    @GetMapping(API_V1_USER + "/is_muted/{userId}")
//    Boolean isUserMutedByMyProfile(@PathVariable("userId") Long userId);
//
//    @GetMapping(API_V1_USER + "/is_user_blocked/{userId}")
//    Boolean isUserBlockedByMyProfile(@PathVariable("userId") Long userId);
//
//    @GetMapping(API_V1_USER + "/is_my_profile_blocked/{userId}")
//    Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId);
//
//    @GetMapping(API_V1_USER + "/is_approved/{userId}")
//    Boolean isMyProfileWaitingForApprove(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/tweet/author/{userId}")
    TweetAuthorResponse getTweetAuthor(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/tweet/additional/info/{userId}")
    TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(@PathVariable("userId") Long userId);

    @PostMapping(API_V1_USER + "/tweet/liked")
    HeaderResponse<UserResponse> getTweetLikedUsersByIds(@RequestBody UserIdsRequest request,
                                                         @SpringQueryMap Pageable pageable);

    @PostMapping(API_V1_USER + "/tweet/retweeted")
    HeaderResponse<UserResponse> getRetweetedUsersByIds(@RequestBody UserIdsRequest request,
                                                        @SpringQueryMap Pageable pageable);
}
