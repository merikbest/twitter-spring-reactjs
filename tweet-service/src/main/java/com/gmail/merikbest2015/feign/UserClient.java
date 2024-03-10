package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
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

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyIdsList")
    @PostMapping(TWEET_VALID_IDS)
    List<Long> getValidTweetUserIds(@RequestBody IdsRequest request, @PathVariable("text") String text);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyIdsList")
    @PostMapping(VALID_IDS)
    List<Long> getValidUserIds(@RequestBody IdsRequest request);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyPinnedTweetId")
    @GetMapping(TWEET_PINNED_USER_ID)
    Long getUserPinnedTweetId(@PathVariable("userId") Long userId);

    default HeaderResponse<UserResponse> defaultEmptyUserResponse(Throwable throwable) {
        return new HeaderResponse<>(new ArrayList<>(), HttpHeaders.EMPTY);
    }

    default ArrayList<Long> defaultEmptyIdsList(Throwable throwable) {
        return new ArrayList<>();
    }

    default Long defaultEmptyPinnedTweetId(Throwable throwable) {
        return 0L;
    }
}
