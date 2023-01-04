package com.gmail.merikbest2015.client.tweet;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.dto.TweetResponse;
import com.gmail.merikbest2015.commons.models.Tweet;
import com.gmail.merikbest2015.commons.projection.TweetImageProjection;
import com.gmail.merikbest2015.commons.projection.TweetProjection;
import com.gmail.merikbest2015.commons.projection.TweetsProjection;
import com.gmail.merikbest2015.commons.projection.TweetsUserProjection;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(value = "tweet-service", configuration = FeignConfiguration.class)
public interface TweetClient {

    @GetMapping("/api/v1/tweets/{userId}")
    Optional<Tweet> getTweetById(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/tweets/user/{userId}")
    List<TweetsUserProjection> getTweetsByUserId(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/tweets/pinned/{userId}")
    Optional<TweetsUserProjection> getPinnedTweetByUserId(@PathVariable("userId") Long userId);

    @PostMapping("/api/v1/tweets/user/media")
    Page<TweetProjection> getAllUserMediaTweets(@RequestBody TweetPageableRequest request);

    @PostMapping("/api/v1/tweets/user/mentions")
    Page<TweetProjection> getUserMentions(@RequestBody TweetPageableRequest request);

    @PostMapping("/api/v1/tweets/user/images")
    List<TweetImageProjection> getUserTweetImages(@RequestBody TweetPageableRequest request);

    @GetMapping("/api/v1/tweets/replies/{userId}")
    List<TweetsUserProjection> getRepliesByUserId(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/tweets/notification/{userId}")
    List<TweetsProjection> getNotificationsFromTweetAuthors(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/tweets/tag")
    List<TweetResponse> getTweetsByTagName(@RequestParam("tagName") String tagName);

    @GetMapping("/api/v1/tweets/user/ids")
    Page<TweetProjection> getTweetsByUserIds(@RequestBody TweetUserIdsRequest request);
}
