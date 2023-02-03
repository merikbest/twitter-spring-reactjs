package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.request.UserRequest;
import com.gmail.merikbest2015.dto.response.*;
import com.gmail.merikbest2015.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.UI_V1_USER;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_USER)
public class UserController {

    private final UserMapper userMapper;

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserById(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getUsers(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = userMapper.getUsers(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/relevant")
    public ResponseEntity<List<UserResponse>> getRelevantUsers() {
        return ResponseEntity.ok(userMapper.getRelevantUsers());
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<List<UserResponse>> searchUsersByUsername(@PathVariable String username, @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = userMapper.searchUsersByUsername(username, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/start")
    public ResponseEntity<Boolean> startUseTwitter() {
        return ResponseEntity.ok(userMapper.startUseTwitter());
    }

//    @GetMapping("/mentions") // TODO Move to tweet-service
//    public ResponseEntity<List<TweetResponse>> getUserMentions(@PageableDefault(size = 10) Pageable pageable) {
//        HeaderResponse<TweetResponse> response = userMapper.getUserMentions(pageable);
//        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
//    }
//
//    @GetMapping("/bookmarks") // TODO Move to tweet-service
//    public ResponseEntity<List<TweetResponse>> getUserBookmarks(@PageableDefault(size = 10) Pageable pageable) {
//        HeaderResponse<TweetResponse> response = userMapper.getUserBookmarks(pageable);
//        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
//    }
//
//    @GetMapping("/bookmarks/{tweetId}") // TODO Move to tweet-service
//    public ResponseEntity<Boolean> processUserBookmarks(@PathVariable Long tweetId) {
//        return ResponseEntity.ok(userMapper.processUserBookmarks(tweetId));
//    }

    @PutMapping
    public ResponseEntity<AuthUserResponse> updateUserProfile(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userMapper.updateUserProfile(userRequest));
    }

//    @GetMapping("/images/{userId}") // TODO Move to tweet-service
//    public ResponseEntity<List<TweetImageResponse>> getUserTweetImages(@PathVariable Long userId) {
//        return ResponseEntity.ok(userMapper.getUserTweetImages(userId));
//    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<UserResponse>> getFollowers(@PathVariable Long userId, @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = userMapper.getFollowers(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserResponse>> getFollowing(@PathVariable Long userId, @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = userMapper.getFollowing(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/follower-requests")
    public ResponseEntity<List<FollowerUserResponse>> getFollowerRequests(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<FollowerUserResponse> response = userMapper.getFollowerRequests(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/follow/{userId}")
    public ResponseEntity<Boolean> processFollow(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processFollow(userId));
    }

    @GetMapping("/follow/overall/{userId}") // TODO add pagination
    public ResponseEntity<List<UserResponse>> overallFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.overallFollowers(userId));
    }

    @GetMapping("/follow/private/{userId}")
    public ResponseEntity<UserProfileResponse> processFollowRequestToPrivateProfile(@PathVariable Long userId) {
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
    public ResponseEntity<List<BlockedUserResponse>> getBlockList(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<BlockedUserResponse> response = userMapper.getBlockList(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/blocked/{userId}")
    public ResponseEntity<Boolean> processBlockList(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processBlockList(userId));
    }

    @GetMapping("/muted")
    public ResponseEntity<List<MutedUserResponse>> getMutedList(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<MutedUserResponse> response = userMapper.getMutedList(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/muted/{userId}")
    public ResponseEntity<Boolean> processMutedList(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.processMutedList(userId));
    }

    @GetMapping("/details/{userId}")
    public ResponseEntity<UserDetailResponse> getUserDetails(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserDetails(userId));
    }
}
