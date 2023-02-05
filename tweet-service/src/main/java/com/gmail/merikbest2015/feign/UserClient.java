package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.*;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAdditionalInfoUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_USER;
import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;

@FeignClient(name = USER_SERVICE, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/is_followed/{userId}")
    Boolean isUserFollowByOtherUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_private/{userId}")
    Boolean isUserHavePrivateProfile(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_my_profile_blocked/{userId}")
    Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/tweet/author/{userId}")
    TweetAuthorResponse getTweetAuthor(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/tweet/additional/info/{userId}")
    TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(@PathVariable("userId") Long userId);

    @PostMapping(API_V1_USER + "/tweet/liked")
    HeaderResponse<UserResponse> getTweetLikedUsersByIds(@RequestBody IdsRequest request,
                                                         @SpringQueryMap Pageable pageable);

    @PostMapping(API_V1_USER + "/tweet/retweeted")
    HeaderResponse<UserResponse> getRetweetedUsersByIds(@RequestBody IdsRequest request,
                                                        @SpringQueryMap Pageable pageable);

    @GetMapping(API_V1_USER + "/ids")
    List<Long> getUserFollowersIds();

    @PutMapping(API_V1_USER + "/tweet/count/{increaseCount}")
    void updateTweetCount(@PathVariable("increaseCount") boolean increaseCount);

    @PutMapping(API_V1_USER + "/media/count/{increaseCount}")
    void updateMediaTweetCount(@PathVariable("increaseCount") boolean increaseCount);

    @PutMapping(API_V1_USER + "/tweet/pinned/{tweetId}")
    void updatePinnedTweetId(@PathVariable("tweetId") Long tweetId);

    @PutMapping(API_V1_USER + "/like/count/{increaseCount}")
    void updateLikeCount(@PathVariable("increaseCount") boolean increaseCount);

    @PostMapping(API_V1_USER + "/tweet/valid/ids/{text}")
    List<Long> getValidUserIds(@RequestBody IdsRequest request, @PathVariable("text") String text);

    @GetMapping(API_V1_USER + "/chat/{userId}")
    ChatTweetUserResponse getChatTweetUser(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_exists/{userId}")
    Boolean isUserExists(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/tweet/pinned/{userId}")
    Long getUserPinnedTweetId(@PathVariable("userId") Long userId);
}
