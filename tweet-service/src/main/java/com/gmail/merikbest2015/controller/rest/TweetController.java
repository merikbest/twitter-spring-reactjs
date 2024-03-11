package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.response.*;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.feign.WebSocketClient;
import com.gmail.merikbest2015.mapper.TweetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;
import static com.gmail.merikbest2015.constants.WebsocketConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_TWEETS)
public class TweetController {

    private final TweetMapper tweetMapper;
    private final WebSocketClient webSocketClient;

    @GetMapping
    public ResponseEntity<List<TweetResponse>> getTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(TWEET_ID)
    public ResponseEntity<TweetResponse> getTweetById(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetById(tweetId));
    }

    @GetMapping(USER_USER_ID)
    public ResponseEntity<List<TweetUserResponse>> getUserTweets(@PathVariable("userId") Long userId,
                                                                 @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetUserResponse> response = tweetMapper.getUserTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(MEDIA_USER_USER_ID)
    public ResponseEntity<List<TweetResponse>> getUserMediaTweets(@PathVariable("userId") Long userId,
                                                                  @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getUserMediaTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(IMAGES_USER_ID)
    public ResponseEntity<List<ProfileTweetImageResponse>> getUserTweetImages(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(tweetMapper.getUserTweetImages(userId));
    }

    @GetMapping(TWEET_ID_INFO)
    public ResponseEntity<TweetAdditionalInfoResponse> getTweetAdditionalInfoById(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetAdditionalInfoById(tweetId));
    }

    @GetMapping(TWEET_ID_REPLIES) // TODO add pagination
    public ResponseEntity<List<TweetResponse>> getRepliesByTweetId(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getRepliesByTweetId(tweetId));
    }

    @GetMapping(TWEET_ID_QUOTES)
    public ResponseEntity<List<TweetResponse>> getQuotesByTweetId(@PathVariable("tweetId") Long tweetId,
                                                                  @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getQuotesByTweetId(tweetId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(MEDIA)
    public ResponseEntity<List<TweetResponse>> getMediaTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getMediaTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(VIDEO)
    public ResponseEntity<List<TweetResponse>> getTweetsWithVideo(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getTweetsWithVideo(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(FOLLOWER)
    public ResponseEntity<List<TweetResponse>> getFollowersTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getFollowersTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(UPLOAD)
    public ResponseEntity<TweetImageResponse> uploadTweetImage(@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(tweetMapper.uploadTweetImage(file));
    }

    @GetMapping(IMAGE_TAGGED)
    public ResponseEntity<List<UserResponse>> getTaggedImageUsers(@PathVariable("tweetId") Long tweetId,
                                                                  @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<UserResponse> response = tweetMapper.getTaggedImageUsers(tweetId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping
    public ResponseEntity<TweetResponse> createTweet(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.createTweet(tweetRequest);
        webSocketClient.send(TOPIC_FEED_ADD, tweet);
        webSocketClient.send(TOPIC_USER_ADD_TWEET + tweet.getAuthor().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @DeleteMapping(TWEET_ID)
    public ResponseEntity<String> deleteTweet(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.deleteTweet(tweetId));
    }

    @GetMapping(SEARCH_TEXT)
    public ResponseEntity<List<TweetResponse>> searchTweets(@PathVariable("text") String text,
                                                            @PageableDefault Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.searchTweets(text, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(REPLY_USER_ID_TWEET_ID)
    public ResponseEntity<NotificationReplyResponse> replyTweet(@PathVariable("userId") Long userId,
                                                                @PathVariable("tweetId") Long tweetId,
                                                                @RequestBody TweetRequest tweetRequest) {
        NotificationReplyResponse notification = tweetMapper.replyTweet(tweetId, tweetRequest);
        webSocketClient.send(TOPIC_FEED, notification);
        webSocketClient.send(TOPIC_TWEET + notification.getTweetId(), notification);
        webSocketClient.send(TOPIC_USER_UPDATE_TWEET + userId, notification);
        return ResponseEntity.ok(notification);
    }

    @PostMapping(QUOTE_USER_ID_TWEET_ID)
    public ResponseEntity<TweetResponse> quoteTweet(@PathVariable("userId") Long userId,
                                                    @PathVariable("tweetId") Long tweetId,
                                                    @RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.quoteTweet(tweetId, tweetRequest);
        webSocketClient.send(TOPIC_FEED_ADD, tweet);
        webSocketClient.send(TOPIC_TWEET + tweet.getId(), tweet);
        webSocketClient.send(TOPIC_USER_ADD_TWEET + userId, tweet);
        return ResponseEntity.ok(tweet);
    }

    @GetMapping(REPLY_CHANGE_USER_ID_TWEET_ID)
    public ResponseEntity<TweetResponse> changeTweetReplyType(@PathVariable("userId") Long userId,
                                                              @PathVariable("tweetId") Long tweetId,
                                                              @RequestParam ReplyType replyType) {
        TweetResponse tweet = tweetMapper.changeTweetReplyType(tweetId, replyType);
        webSocketClient.send(TOPIC_FEED, tweet);
        webSocketClient.send(TOPIC_TWEET + tweet.getId(), tweet);
        webSocketClient.send(TOPIC_USER_UPDATE_TWEET + userId, tweet);
        return ResponseEntity.ok(tweet);
    }
}
