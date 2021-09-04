package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.NotificationTweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TweetMapper;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<TweetResponse>> getTweets() {
        return ResponseEntity.ok(tweetMapper.getTweets());
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetResponse> getTweetById(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetById(tweetId));
    }

    @GetMapping("/media")
    public ResponseEntity<List<TweetResponse>> getMediaTweets() {
        return ResponseEntity.ok(tweetMapper.getMediaTweets());
    }

    @PostMapping
    public ResponseEntity<TweetResponse> createTweet(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.createTweet(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/poll")
    public ResponseEntity<TweetResponse> createPoll(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.createPoll(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        return ResponseEntity.ok(tweet);
    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<String> deleteTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.deleteTweet(tweetId));
    }

    @GetMapping("/search/{text}")
    public ResponseEntity<List<TweetResponse>> searchTweets(@PathVariable String text) {
        return ResponseEntity.ok(tweetMapper.searchTweets(text));
    }

    @GetMapping("/like/{tweetId}")
    public ResponseEntity<NotificationTweetResponse> likeTweet(@PathVariable Long tweetId) {
        NotificationResponse notification = tweetMapper.likeTweet(tweetId);
        messagingTemplate.convertAndSend("/topic/notifications/" + notification.getTweet().getUser().getId(), notification);
        return ResponseEntity.ok(notification.getTweet());
    }

    @GetMapping("/retweet/{tweetId}")
    public ResponseEntity<NotificationTweetResponse> retweet(@PathVariable Long tweetId) {
        NotificationResponse notification = tweetMapper.retweet(tweetId);
        messagingTemplate.convertAndSend("/topic/notifications/" + notification.getTweet().getUser().getId(), notification);
        return ResponseEntity.ok(notification.getTweet());
    }

    @PostMapping("/reply/{tweetId}")
    public ResponseEntity<TweetResponse> replyTweet(@PathVariable Long tweetId, @RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.replyTweet(tweetId, tweetRequest));
    }

    @GetMapping("/reply/change/{tweetId}")
    public ResponseEntity<TweetResponse> changeTweetReplyType(@PathVariable Long tweetId, @RequestParam ReplyType replyType) {
        TweetResponse tweet = tweetMapper.changeTweetReplyType(tweetId, replyType);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/vote")
    public ResponseEntity<TweetResponse> voteInPoll(@RequestBody VoteRequest voteRequest) {
        TweetResponse tweet = tweetMapper.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollChoiceId());
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        return ResponseEntity.ok(tweet);
    }
}
