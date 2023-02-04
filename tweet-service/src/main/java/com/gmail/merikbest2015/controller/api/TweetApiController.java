package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.ChatTweetResponse;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.mapper.TweetClientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TWEETS;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_TWEETS)
public class TweetApiController {

    private final TweetClientMapper tweetClientMapper;

    @PostMapping("/tag/ids")
    public List<TweetResponse> getTweetsByIds(@RequestBody IdsRequest requests) {
        return tweetClientMapper.getTweetsByIds(requests);
    }

    @PostMapping("/user/ids")
    public HeaderResponse<TweetResponse> getTweetsByUserIds(@RequestBody IdsRequest request,
                                                            @SpringQueryMap Pageable pageable) {
        return tweetClientMapper.getTweetsByUserIds(request, pageable);
    }

    @GetMapping("/{tweetId}")
    public TweetResponse getTweetById(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.getTweetById(tweetId);
    }

    @PostMapping("/ids")
    public HeaderResponse<TweetResponse> getTweetsByIds(@RequestBody IdsRequest request, Pageable pageable) {
        return tweetClientMapper.getTweetsByIds(request, pageable);
    }

    @GetMapping("/notification/{tweetId}")
    public NotificationTweetResponse getNotificationTweet(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.getNotificationTweet(tweetId);
    }

    @GetMapping("/id/{tweetId}")
    public Boolean isTweetExists(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.isTweetExists(tweetId);
    }

    @GetMapping("/chat/{tweetId}")
    public ChatTweetResponse getChatTweet(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.getChatTweet(tweetId);
    }
}
