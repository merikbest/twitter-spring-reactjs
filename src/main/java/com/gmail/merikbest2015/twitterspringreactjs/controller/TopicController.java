package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SuggestedTopicsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TopicsCategoriesRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TopicMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/topics")
public class TopicController {

    private final TopicMapper topicMapper;

    @PostMapping("/suggested")
    public ResponseEntity<List<TopicResponse>> getTopicsByIds(@RequestBody SuggestedTopicsRequest request) {
        return ResponseEntity.ok(topicMapper.getTopicsByIds(request.getTopicsIds()));
    }

    @PostMapping("/category")
    public ResponseEntity<List<TopicsByCategoriesResponse>> getTopicsByCategories(@RequestBody TopicsCategoriesRequest request) {
        return ResponseEntity.ok(topicMapper.getTopicsByCategories(request.getCategories()));
    }

    @GetMapping("/not_interested")
    public ResponseEntity<List<TopicResponse>> getNotInterestedTopics() {
        return ResponseEntity.ok(topicMapper.getNotInterestedTopics());
    }

    @GetMapping("/not_interested/{topicId}")
    public ResponseEntity<Boolean> processNotInterestedTopic(@PathVariable Long topicId) {
        return ResponseEntity.ok(topicMapper.processNotInterestedTopic(topicId));
    }

    @GetMapping("/follow/{topicId}")
    public ResponseEntity<Boolean> processFollowTopic(@PathVariable Long topicId) {
        return ResponseEntity.ok(topicMapper.processFollowTopic(topicId));
    }
}
