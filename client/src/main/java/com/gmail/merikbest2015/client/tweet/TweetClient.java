package com.gmail.merikbest2015.client.tweet;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.commons.dto.TweetResponse;
import com.gmail.merikbest2015.commons.models.Tweet;
import com.gmail.merikbest2015.commons.projection.TweetImageProjection;
import com.gmail.merikbest2015.commons.projection.TweetProjection;
import com.gmail.merikbest2015.commons.projection.TweetsProjection;
import com.gmail.merikbest2015.commons.projection.TweetsUserProjection;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.commons.controller.PathConstants.API_V1_TWEETS;

@FeignClient(value = "tweet-service", configuration = FeignConfiguration.class)
public interface TweetClient {

    @GetMapping(API_V1_TWEETS + "/{userId}")
    Optional<Tweet> getTweetById(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_TWEETS + "/user/{userId}")
    List<TweetsUserProjection> getTweetsByUserId(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_TWEETS + "/pinned/{userId}")
    Optional<TweetsUserProjection> getPinnedTweetByUserId(@PathVariable("userId") Long userId);

    @PostMapping(API_V1_TWEETS + "/user/media")
    Page<TweetProjection> getAllUserMediaTweets(@RequestBody TweetPageableRequest request);

    @PostMapping(API_V1_TWEETS + "/user/mentions")
    Page<TweetProjection> getUserMentions(@RequestBody TweetPageableRequest request);

    @PostMapping(API_V1_TWEETS + "/user/images")
    List<TweetImageProjection> getUserTweetImages(@RequestBody TweetPageableRequest request);

    @GetMapping(API_V1_TWEETS + "/replies/{userId}")
    List<TweetsUserProjection> getRepliesByUserId(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_TWEETS + "/notification/{userId}")
    List<TweetsProjection> getNotificationsFromTweetAuthors(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_TWEETS + "/ids/{tweetIds}")
    List<TweetResponse> getTweetsByIds(@PathVariable("tweetIds") List<Long> tweetIds);

    @PostMapping(API_V1_TWEETS + "/user/ids") // del
    HeaderResponse<TweetResponse> getTweetsByUserIds(@RequestBody TweetUserIdsRequest request, @SpringQueryMap Pageable pageable);
}
