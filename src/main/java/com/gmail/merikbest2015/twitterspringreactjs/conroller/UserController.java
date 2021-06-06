package com.gmail.merikbest2015.twitterspringreactjs.conroller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/tweets")
    public ResponseEntity<List<TweetResponse>> getTweets() {
        return ResponseEntity.ok(userMapper.getTweets());
    }

    @GetMapping("/tweet/{tweetId}")
    public ResponseEntity<TweetResponse> getTweetById(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.getTweetById(tweetId));
    }

    @PostMapping("/create/tweet")
    public ResponseEntity<List<TweetResponse>> createTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(userMapper.createTweet(tweetRequest));
    }

    @DeleteMapping("/delete/tweet/{tweetId}")
    public ResponseEntity<List<TweetResponse>> deleteTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(userMapper.deleteTweet(tweetId));
    }
}
