package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TopicMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/topics")
public class TopicController {

    private final TopicMapper topicMapper;

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getTopics() {
        return ResponseEntity.ok(topicMapper.getTopics());
    }
}
