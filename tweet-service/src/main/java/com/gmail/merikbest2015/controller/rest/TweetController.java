package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.response.*;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.mapper.TweetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.UI_V1_TWEETS;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_TWEETS)
public class TweetController {

    private final TweetMapper tweetMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<List<TweetResponse>> getTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetResponse> getTweetById(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetById(tweetId));
    }

    @GetMapping("/user/{userId}") // TODO change endpoint in frontend
    public ResponseEntity<List<TweetUserResponse>> getUserTweets(@PathVariable Long userId,
                                                                 @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetUserResponse> response = tweetMapper.getUserTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/media/user/{userId}/") // TODO change endpoint in frontend
    public ResponseEntity<List<TweetResponse>> getUserMediaTweets(@PathVariable Long userId,
                                                                  @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getUserMediaTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/user/mentions") // TODO change endpoint in frontend
    public ResponseEntity<List<TweetResponse>> getUserMentions(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getUserMentions(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/images/{userId}") // TODO change endpoint in frontend
    public ResponseEntity<List<ProfileTweetImageResponse>> getUserTweetImages(@PathVariable Long userId) {
        return ResponseEntity.ok(tweetMapper.getUserTweetImages(userId));
    }

    @GetMapping("/{tweetId}/info")
    public ResponseEntity<TweetAdditionalInfoResponse> getTweetAdditionalInfoById(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetAdditionalInfoById(tweetId));
    }

    @GetMapping("/{tweetId}/replies") // TODO add pagination
    public ResponseEntity<List<TweetResponse>> getRepliesByTweetId(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getRepliesByTweetId(tweetId));
    }

    @GetMapping("/{tweetId}/quotes")
    public ResponseEntity<List<TweetResponse>> getQuotesByTweetId(@PathVariable("tweetId") Long tweetId,
                                                                  @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getQuotesByTweetId(pageable, tweetId);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/media")
    public ResponseEntity<List<TweetResponse>> getMediaTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getMediaTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/video")
    public ResponseEntity<List<TweetResponse>> getTweetsWithVideo(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getTweetsWithVideo(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/follower")
    public ResponseEntity<List<TweetResponse>> getFollowersTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getFollowersTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<TweetResponse>> getScheduledTweets(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getScheduledTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping("/upload") // TODO add endpoint to frontend
    public ResponseEntity<TweetImageResponse> uploadTweetImage(@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(tweetMapper.uploadTweetImage(file));
    }

    @PostMapping
    public ResponseEntity<TweetResponse> createTweet(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.createTweet(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/schedule")
    public ResponseEntity<TweetResponse> createScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.createTweet(tweetRequest));
    }

    @PutMapping("/schedule")
    public ResponseEntity<TweetResponse> updateScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.updateScheduledTweet(tweetRequest));
    }

    @DeleteMapping("/schedule")
    public ResponseEntity<String> deleteScheduledTweets(@RequestBody TweetDeleteRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.deleteScheduledTweets(tweetRequest));
    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<String> deleteTweet(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(tweetMapper.deleteTweet(tweetId));
    }

    @GetMapping("/search/{text}")
    public ResponseEntity<List<TweetResponse>> searchTweets(@PathVariable("text") String text,
                                                            @PageableDefault Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.searchTweets(text, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping("/reply/{userId}/{tweetId}")
    public ResponseEntity<NotificationReplyResponse> replyTweet(@PathVariable("userId") Long userId,
                                                                @PathVariable("tweetId") Long tweetId,
                                                                @RequestBody TweetRequest tweetRequest) {
        NotificationReplyResponse notification = tweetMapper.replyTweet(tweetId, tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed", notification);
        messagingTemplate.convertAndSend("/topic/tweet/" + notification.getTweetId(), notification);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + userId, notification);
        return ResponseEntity.ok(notification);
    }

    @PostMapping("/quote/{userId}/{tweetId}")
    public ResponseEntity<TweetResponse> quoteTweet(@PathVariable("userId") Long userId,
                                                    @PathVariable("tweetId") Long tweetId,
                                                    @RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.quoteTweet(tweetId, tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + userId, tweet);
        return ResponseEntity.ok(tweet);
    }

    @GetMapping("/reply/change/{userId}/{tweetId}")
    public ResponseEntity<TweetResponse> changeTweetReplyType(@PathVariable("userId") Long userId,
                                                              @PathVariable("tweetId") Long tweetId,
                                                              @RequestParam ReplyType replyType) {
        TweetResponse tweet = tweetMapper.changeTweetReplyType(tweetId, replyType);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + userId, tweet);
        return ResponseEntity.ok(tweet);
    }
}
