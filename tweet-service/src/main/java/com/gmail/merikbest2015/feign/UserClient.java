package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAdditionalInfoUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.response.user.TaggedUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.*;

@FeignClient(name = USER_SERVICE, path = API_V1_USER, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(IS_FOLLOWED_USER_ID)
    Boolean isUserFollowByOtherUser(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(IS_PRIVATE_USER_ID)
    Boolean isUserHavePrivateProfile(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(IS_MY_PROFILE_BLOCKED_USER_ID)
    Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(TWEET_AUTHOR_USER_ID)
    TweetAuthorResponse getTweetAuthor(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(TWEET_ADDITIONAL_INFO_USER_ID)
    TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyUserResponse")
    @PostMapping(IDS)
    HeaderResponse<UserResponse> getUsersByIds(@RequestBody IdsRequest request, @SpringQueryMap Pageable pageable);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyIdsList")
    @GetMapping(FOLLOWERS_IDS)
    List<Long> getUserFollowersIds();

    @CircuitBreaker(name = USER_SERVICE)
    @PutMapping(TWEET_COUNT)
    void updateTweetCount(@PathVariable("increaseCount") boolean increaseCount);

    @CircuitBreaker(name = USER_SERVICE)
    @PutMapping(MEDIA_COUNT)
    void updateMediaTweetCount(@PathVariable("increaseCount") boolean increaseCount);

    @CircuitBreaker(name = USER_SERVICE)
    @PutMapping(TWEET_PINNED_TWEET_ID)
    void updatePinnedTweetId(@PathVariable("tweetId") Long tweetId);

    @CircuitBreaker(name = USER_SERVICE)
    @PutMapping(LIKE_COUNT)
    void updateLikeCount(@PathVariable("increaseCount") boolean increaseCount);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyIdsList")
    @PostMapping(TWEET_VALID_IDS)
    List<Long> getValidTweetUserIds(@RequestBody IdsRequest request, @PathVariable("text") String text);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyIdsList")
    @PostMapping(VALID_IDS)
    List<Long> getValidUserIds(@RequestBody IdsRequest request);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyUsersList")
    @PostMapping(TAGGED_IMAGE)
    List<TaggedUserResponse> getTaggedImageUsers(@RequestBody IdsRequest idsRequest);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(CHAT_USER_ID)
    ChatTweetUserResponse getChatTweetUser(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(IS_EXISTS_USER_ID)
    Boolean isUserExists(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyPinnedTweetId")
    @GetMapping(TWEET_PINNED_USER_ID)
    Long getUserPinnedTweetId(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(USER_ID_USERNAME)
    Long getUserIdByUsername(@PathVariable("username") String username);

    default HeaderResponse<UserResponse> defaultEmptyUserResponse(Throwable throwable) {
        return new HeaderResponse<>(new ArrayList<>(), HttpHeaders.EMPTY);
    }

    default ArrayList<Long> defaultEmptyIdsList(Throwable throwable) {
        return new ArrayList<>();
    }

    default ArrayList<TaggedUserResponse> defaultEmptyUsersList(Throwable throwable) {
        return new ArrayList<>();
    }

    default Long defaultEmptyPinnedTweetId(Throwable throwable) {
        return 0L;
    }
}
