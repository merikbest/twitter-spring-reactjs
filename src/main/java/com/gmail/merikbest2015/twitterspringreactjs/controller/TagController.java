package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TagProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TagMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
public class TagController {

    private final TagMapper tagMapper;

    @GetMapping
    public ResponseEntity<List<TagProjectionResponse>> getTags() {
        return ResponseEntity.ok(tagMapper.getTags());
    }

    @GetMapping("/trends")
    public ResponseEntity<List<TagProjectionResponse>> getTrends() {
        return ResponseEntity.ok(tagMapper.getTrends());
    }

    @GetMapping("/{tagName}")
    public ResponseEntity<List<TweetProjectionResponse>> getTweetsByTag(@PathVariable String tagName) {
        return ResponseEntity.ok(tagMapper.getTweetsByTag(tagName));
    }
}
