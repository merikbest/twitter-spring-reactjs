package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.mapper.TweetClientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_TWEETS)
public class TweetApiController {

    private final TweetClientMapper tweetClientMapper;

    @PostMapping(IDS)
    public List<TweetResponse> getTweetsByIds(@RequestBody IdsRequest requests) {
        return tweetClientMapper.getTweetsByIds(requests);
    }

    @PostMapping(USER_IDS)
    public HeaderResponse<TweetResponse> getTweetsByUserIds(@RequestBody IdsRequest request,
                                                            @SpringQueryMap Pageable pageable) {
        return tweetClientMapper.getTweetsByUserIds(request, pageable);
    }

    @GetMapping(TWEET_ID)
    public TweetResponse getTweetById(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.getTweetById(tweetId);
    }

    @GetMapping(NOTIFICATION_TWEET_ID)
    public NotificationTweetResponse getNotificationTweet(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.getNotificationTweet(tweetId);
    }

    @GetMapping(ID_TWEET_ID)
    public Boolean isTweetExists(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.isTweetExists(tweetId);
    }

    @GetMapping(COUNT_TEXT)
    public Long getTweetCountByText(@PathVariable("text") String text) {
        return tweetClientMapper.getTweetCountByText(text);
    }

    @GetMapping(CHAT_TWEET_ID)
    public ChatTweetResponse getChatTweet(@PathVariable("tweetId") Long tweetId) {
        return tweetClientMapper.getChatTweet(tweetId);
    }
}
