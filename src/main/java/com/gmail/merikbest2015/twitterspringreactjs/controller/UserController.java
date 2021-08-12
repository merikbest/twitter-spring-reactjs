package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserMapper userMapper;

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

    @PutMapping
    public ResponseEntity<UserResponse> updateUserProfile(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userMapper.updateUserProfile(userRequest));
    }

    @PostMapping("/upload")
    public ResponseEntity<ImageResponse> uploadImage(@RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(userMapper.uploadImage(file));
    }

    @GetMapping("/follow/{userId}")
    public ResponseEntity<UserResponse> follow(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.follow(userId));
    }

    @GetMapping("/unfollow/{userId}")
    public ResponseEntity<UserResponse> unfollow(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.unfollow(userId));
    }
}
