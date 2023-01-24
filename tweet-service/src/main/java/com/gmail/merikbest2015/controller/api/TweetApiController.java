package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.mapper.TweetClientMapper;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.service.TweetClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TWEETS;


@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_TWEETS)
public class TweetApiController {

    private final TweetClientService tweetClientService;
    private final TweetClientMapper tweetClientMapper;
    private final BasicMapper basicMapper;

//    @GetMapping("/{userId}")
//    public Optional<Tweet> getTweetById(@PathVariable("userId") Long userId) {
//        return tweetClientService.getTweetById(userId);
//    }
//
//    @GetMapping("/user/{userId}")
//    public List<TweetsUserProjection> getTweetsByUserId(@PathVariable("userId") Long userId) {
//        return tweetClientService.getTweetsByUserId(userId);
//    }
//
//    @GetMapping("/pinned/{userId}")
//    public Optional<TweetsUserProjection> getPinnedTweetByUserId(@PathVariable("userId") Long userId) {
//        return tweetClientService.getPinnedTweetByUserId(userId);
//    }
//
//    @PostMapping("/user/media")
//    public Page<TweetProjection> getAllUserMediaTweets(@RequestBody TweetPageableRequest request) {
//        return tweetClientService.getAllUserMediaTweets(request);
//    }
//
//    @PostMapping("/user/mentions")
//    public Page<TweetProjection> getUserMentions(@RequestBody TweetPageableRequest request) {
//        return tweetClientService.getUserMentions(request);
//    }
//
//    @PostMapping("/user/images")
//    public List<TweetImageProjection> getUserTweetImages(@RequestBody TweetPageableRequest request) {
//        return tweetClientService.getUserTweetImages(request);
//    }
//
//    @GetMapping("/replies/{userId}")
//    public List<TweetsUserProjection> getRepliesByUserId(@PathVariable("userId") Long userId) {
//        return tweetClientService.getRepliesByUserId(userId);
//    }
//
//    @GetMapping("/notification/{userId}")
//    public List<TweetProjection> getNotificationsFromTweetAuthors(@PathVariable("userId") Long userId) {
//        return tweetClientService.getNotificationsFromTweetAuthors(userId);
//    }
//
//    @GetMapping("/ids/{tweetIds}")
//    public List<TweetResponse> getTweetsByIds(@PathVariable("tweetIds") List<Long> tweetIds) {
//        return tweetClientMapper.getTweetsByIds(tweetIds);
//    }
//
//    @PostMapping("/user/ids")
//    public HeaderResponse<TweetResponse> getTweetsByUserIds(@RequestBody TweetUserIdsRequest request,
//                                                            @SpringQueryMap Pageable pageable) {
//        Page<TweetProjection> tweets = tweetClientService.getTweetsByUserIds(request, pageable);
//        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
//    }

    // NEW
    @GetMapping(API_V1_TWEETS + "/{tweetId}")
    public NotificationTweetResponse getNotificationTweet(@PathVariable("tweetId") Long tweetId) {
        return tweetClientService.getNotificationTweet(tweetId);
    }
}
