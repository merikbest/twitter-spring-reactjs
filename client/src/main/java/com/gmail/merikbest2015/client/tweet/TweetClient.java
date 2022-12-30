package com.gmail.merikbest2015.client.tweet;

import com.gmail.merikbest2015.models.Tweet;
import com.gmail.merikbest2015.projection.TweetImageProjection;
import com.gmail.merikbest2015.projection.TweetProjection;
import com.gmail.merikbest2015.projection.TweetsProjection;
import com.gmail.merikbest2015.projection.TweetsUserProjection;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@FeignClient("tweet-service")
public interface TweetClient {

    @GetMapping("/api/v1/tweet/{userId}")
    Optional<Tweet> getTweetById(@PathVariable Long userId);

    @GetMapping("/api/v1/tweet/user/{userId}")
    List<TweetsUserProjection> getTweetsByUserId(@PathVariable Long userId);

    @GetMapping("/api/v1/tweet/pinned/{userId}")
    Optional<TweetsUserProjection> getPinnedTweetByUserId(@PathVariable Long userId);

    @PostMapping("/api/v1/tweet/user/media")
    Page<TweetProjection> getAllUserMediaTweets(@RequestBody TweetPageableRequest request);

    @PostMapping("/api/v1/tweet/user/mentions")
    Page<TweetProjection> getUserMentions(@RequestBody TweetPageableRequest request);

    @PostMapping("/api/v1/tweet/user/images")
    List<TweetImageProjection> getUserTweetImages(@RequestBody TweetPageableRequest request);

    @GetMapping("/api/v1/tweet/replies/{userId}")
    List<TweetsUserProjection> getRepliesByUserId(@PathVariable Long userId);

    @GetMapping("/api/v1/tweet/pinned/{userId}")
    List<TweetsProjection> getNotificationsFromTweetAuthors(@PathVariable Long userId);
}
