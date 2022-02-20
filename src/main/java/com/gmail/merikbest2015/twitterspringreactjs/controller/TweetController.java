package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationTweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TweetMapper;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweets")
public class TweetController {

    private final TweetMapper tweetMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<List<TweetProjectionResponse>> getTweets(@PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = tweetMapper.getTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetProjectionResponse> getTweetById(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetById(tweetId));
    }

    @GetMapping("/media")
    public ResponseEntity<List<TweetProjectionResponse>> getMediaTweets(@PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = tweetMapper.getMediaTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/video")
    public ResponseEntity<List<TweetProjectionResponse>> getTweetsWithVideo(@PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = tweetMapper.getTweetsWithVideo(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<TweetProjectionResponse>> getScheduledTweets() {
        return ResponseEntity.ok(tweetMapper.getScheduledTweets());
    }

    @PostMapping
    public ResponseEntity<TweetProjectionResponse> createTweet(@RequestBody TweetRequest tweetRequest) {
        TweetProjectionResponse tweet = tweetMapper.createTweet(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/poll")
    public ResponseEntity<TweetProjectionResponse> createPoll(@RequestBody TweetRequest tweetRequest) {
        TweetProjectionResponse tweet = tweetMapper.createPoll(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/schedule")
    public ResponseEntity<TweetProjectionResponse> createScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.createTweet(tweetRequest));
    }

    @PutMapping("/schedule")
    public ResponseEntity<TweetProjectionResponse> updateScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.updateScheduledTweet(tweetRequest));
    }

    @DeleteMapping("/schedule")
    public ResponseEntity<String> deleteScheduledTweets(@RequestBody TweetDeleteRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.deleteScheduledTweets(tweetRequest));
    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<TweetProjectionResponse> deleteTweet(@PathVariable Long tweetId) {
        TweetProjectionResponse tweet = tweetMapper.deleteTweet(tweetId);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @GetMapping("/search/{text}")
    public ResponseEntity<List<TweetProjectionResponse>> searchTweets(@PathVariable String text) {
        return ResponseEntity.ok(tweetMapper.searchTweets(text));
    }

    @GetMapping("/like/{tweetId}")
    public ResponseEntity<NotificationTweetProjectionResponse> likeTweet(@PathVariable Long tweetId) {
        NotificationProjectionResponse notification = tweetMapper.likeTweet(tweetId);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getTweet().getUser().getId(), notification);
        }
        messagingTemplate.convertAndSend("/topic/feed", notification);
        messagingTemplate.convertAndSend("/topic/tweet/" + notification.getTweet().getId(), notification);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + notification.getTweet().getUser().getId(), notification);
        return ResponseEntity.ok(notification.getTweet());
    }

    @GetMapping("/retweet/{tweetId}")
    public ResponseEntity<NotificationTweetProjectionResponse> retweet(@PathVariable Long tweetId) {
        NotificationProjectionResponse notification = tweetMapper.retweet(tweetId);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getTweet().getUser().getId(), notification);
        }
        messagingTemplate.convertAndSend("/topic/feed", notification);
        messagingTemplate.convertAndSend("/topic/tweet/" + notification.getTweet().getId(), notification);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + notification.getTweet().getUser().getId(), notification);
        return ResponseEntity.ok(notification.getTweet());
    }

    @PostMapping("/reply/{tweetId}")
    public ResponseEntity<TweetProjectionResponse> replyTweet(@PathVariable Long tweetId, @RequestBody TweetRequest tweetRequest) {
        TweetProjectionResponse tweet = tweetMapper.replyTweet(tweetId, tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/quote/{tweetId}")
    public ResponseEntity<TweetProjectionResponse> quoteTweet(@PathVariable Long tweetId, @RequestBody TweetRequest tweetRequest) {
        TweetProjectionResponse tweet = tweetMapper.quoteTweet(tweetId, tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @GetMapping("/reply/change/{tweetId}")
    public ResponseEntity<TweetProjectionResponse> changeTweetReplyType(@PathVariable Long tweetId, @RequestParam ReplyType replyType) {
        TweetProjectionResponse tweet = tweetMapper.changeTweetReplyType(tweetId, replyType);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/vote")
    public ResponseEntity<TweetProjectionResponse> voteInPoll(@RequestBody VoteRequest voteRequest) {
        TweetProjectionResponse tweet = tweetMapper.voteInPoll(voteRequest);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }
}
