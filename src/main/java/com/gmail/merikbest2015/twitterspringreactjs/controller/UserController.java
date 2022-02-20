package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationsProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserMapper userMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileProjectionResponse> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserById(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserProjectionResponse>> getUsers() {
        return ResponseEntity.ok(userMapper.getUsers());
    }

    @GetMapping("/relevant")
    public ResponseEntity<List<UserProjectionResponse>> getRelevantUsers() {
        return ResponseEntity.ok(userMapper.getRelevantUsers());
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<List<UserProjectionResponse>> searchUsersByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userMapper.searchUsersByUsername(username));
    }

    @GetMapping("/start")
    public ResponseEntity<Boolean> startUseTwitter() {
        return ResponseEntity.ok(userMapper.startUseTwitter());
    }

    @GetMapping("/{userId}/tweets")
    public ResponseEntity<List<TweetProjectionResponse>> getUserTweets(@PathVariable Long userId, @PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = userMapper.getUserTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/{userId}/liked")
    public ResponseEntity<List<TweetProjectionResponse>> getUserLikedTweets(@PathVariable Long userId, @PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = userMapper.getUserLikedTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/{userId}/media")
    public ResponseEntity<List<TweetProjectionResponse>> getUserMediaTweets(@PathVariable Long userId, @PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = userMapper.getUserMediaTweets(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/{userId}/replies")
    public ResponseEntity<List<TweetProjectionResponse>> getUserRetweetsAndReplies(@PathVariable Long userId, @PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = userMapper.getUserRetweetsAndReplies(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/notifications")
    public ResponseEntity<NotificationsProjectionResponse> getUserNotifications() {
        return ResponseEntity.ok(userMapper.getUserNotifications());
    }

    @GetMapping("/notifications/timeline")
    public ResponseEntity<List<TweetProjectionResponse>> getNotificationsFromTweetAuthors(@PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = userMapper.getNotificationsFromTweetAuthors(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<TweetProjectionResponse>> getUserBookmarks(@PageableDefault(size = 10) Pageable pageable) {
        TweetHeaderProjectionResponse response = userMapper.getUserBookmarks(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getTweets());
    }

    @GetMapping("/bookmarks/{tweetId}")
    public ResponseEntity<Boolean> processUserBookmarks(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.processUserBookmarks(tweetId));
    }

    @PutMapping
    public ResponseEntity<AuthUserProjectionResponse> updateUserProfile(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userMapper.updateUserProfile(userRequest));
    }

    @PostMapping("/upload")
    public ResponseEntity<ImageResponse> uploadImage(@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(userMapper.uploadImage(file));
    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<BaseUserProjectionResponse>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getFollowers(userId));
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<BaseUserProjectionResponse>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getFollowing(userId));
    }

    @GetMapping("/follow/{userId}")
    public ResponseEntity<NotificationUserProjectionResponse> processFollow(@PathVariable Long userId) {
        NotificationProjectionResponse notification = userMapper.processFollow(userId);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getUserToFollow().getId(), notification);
        }
        return ResponseEntity.ok(notification.getUserToFollow());
    }

    @GetMapping("/follow/overall/{userId}")
    public ResponseEntity<List<BaseUserProjectionResponse>> overallFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.overallFollowers(userId));
    }

    @GetMapping("/follow/private/{userId}")
    public ResponseEntity<UserProfileProjectionResponse> processFollowRequestToPrivateProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processFollowRequestToPrivateProfile(userId));
    }

    @GetMapping("/follow/accept/{userId}")
    public ResponseEntity<String> acceptFollowRequest(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.acceptFollowRequest(userId));
    }

    @GetMapping("/follow/decline/{userId}")
    public ResponseEntity<String> declineFollowRequest(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.declineFollowRequest(userId));
    }

    @GetMapping("/subscribe/{userId}")
    public ResponseEntity<Boolean> processSubscribeToNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processSubscribeToNotifications(userId));
    }

    @GetMapping("/pin/tweet/{tweetId}")
    public ResponseEntity<Long> processPinTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.processPinTweet(tweetId));
    }

    @GetMapping("/blocked")
    public ResponseEntity<List<BlockedUserProjectionResponse>> getBlockList() {
        return ResponseEntity.ok(userMapper.getBlockList());
    }

    @GetMapping("/blocked/{userId}")
    public ResponseEntity<Boolean> processBlockList(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processBlockList(userId));
    }

    @GetMapping("/muted")
    public ResponseEntity<List<MutedUserProjectionResponse>> getMutedList() {
        return ResponseEntity.ok(userMapper.getMutedList());
    }

    @GetMapping("/muted/{userId}")
    public ResponseEntity<Boolean> processMutedList(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processMutedList(userId));
    }

    @GetMapping("/details/{userId}") // TODO Add tests
    public ResponseEntity<UserDetailProjectionResponse> getUserDetails(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserDetails(userId));
    }
}
