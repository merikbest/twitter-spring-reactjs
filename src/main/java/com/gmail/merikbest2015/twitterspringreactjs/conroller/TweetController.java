package com.gmail.merikbest2015.twitterspringreactjs.conroller;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TweetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweets")
public class TweetController {

    private final TweetMapper tweetMapper;

    @GetMapping
    @JsonView(Views.Tweet.class)
    public ResponseEntity<List<TweetResponse>> getTweets() {
        return ResponseEntity.ok(tweetMapper.getTweets());
    }

    @GetMapping("/{tweetId}")
    @JsonView(Views.Tweet.class)
    public ResponseEntity<TweetResponse> getTweetById(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetById(tweetId));
    }

    @PostMapping
    @JsonView(Views.Tweet.class)
    public ResponseEntity<List<TweetResponse>> createTweet(@RequestPart(name = "file", required = false) MultipartFile file,
                                                           @RequestPart TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.createTweet(tweetRequest, file));
    }

    @DeleteMapping("/{tweetId}")
    @JsonView(Views.Tweet.class)
    public ResponseEntity<List<TweetResponse>> deleteTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.deleteTweet(tweetId));
    }
}
