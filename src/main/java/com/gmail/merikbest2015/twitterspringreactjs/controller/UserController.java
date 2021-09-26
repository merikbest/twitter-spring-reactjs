package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserById(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getUsers() {
        return ResponseEntity.ok(userMapper.getUsers());
    }

    @GetMapping("/relevant")
    public ResponseEntity<List<UserResponse>> getRelevantUsers() {
        return ResponseEntity.ok(userMapper.getRelevantUsers());
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<List<UserResponse>> searchUsersByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userMapper.searchUsersByUsername(username));
    }

    @GetMapping("/{userId}/start")
    public ResponseEntity<UserResponse> startUseTwitter(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.startUseTwitter(userId));
    }

    @GetMapping("/{userId}/tweets")
    public ResponseEntity<List<TweetResponse>> getUserTweets(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserTweets(userId));
    }

    @GetMapping("/{userId}/liked")
    public ResponseEntity<List<TweetResponse>> getUserLikedTweets(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserLikedTweets(userId));
    }

    @GetMapping("/{userId}/media")
    public ResponseEntity<List<TweetResponse>> getUserMediaTweets(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserMediaTweets(userId));
    }

    @GetMapping("/{userId}/replies")
    public ResponseEntity<List<TweetResponse>> getUserRetweetsAndReplies(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserRetweetsAndReplies(userId));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationResponse>> getUserNotifications() {
        return ResponseEntity.ok(userMapper.getUserNotifications());
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<TweetResponse>> getUserBookmarks() {
        return ResponseEntity.ok(userMapper.getUserBookmarks());
    }

    @GetMapping("/bookmarks/{tweetId}")
    public ResponseEntity<UserResponse> processUserBookmarks(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.processUserBookmarks(tweetId));
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateUserProfile(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userMapper.updateUserProfile(userRequest));
    }

    @PostMapping("/upload")
    public ResponseEntity<ImageResponse> uploadImage(@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(userMapper.uploadImage(file));
    }

    @GetMapping("/follow/{userId}")
    public ResponseEntity<NotificationUserResponse> follow(@PathVariable Long userId) {
        NotificationResponse notification = userMapper.follow(userId);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getUserToFollow().getId(), notification);
        }
        return ResponseEntity.ok(notification.getUserToFollow());
    }

    @GetMapping("/pin/tweet/{tweetId}")
    public ResponseEntity<UserResponse> pinTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.pinTweet(tweetId));
    }

    @GetMapping("/unpin/tweet/{tweetId}")
    public ResponseEntity<UserResponse> unpinTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.unpinTweet(tweetId));
    }
}
