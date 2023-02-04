package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.request.VoteRequest;
import com.gmail.merikbest2015.mapper.PollMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.gmail.merikbest2015.controller.PathConstants.UI_V1_TWEETS;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_TWEETS)
public class PollController {

    private final PollMapper pollMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/poll")
    public ResponseEntity<TweetResponse> createPoll(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = pollMapper.createPoll(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/vote") // TODO validate and fix
    public ResponseEntity<TweetResponse> voteInPoll(@RequestBody VoteRequest voteRequest) {
        TweetResponse tweet = pollMapper.voteInPoll(voteRequest);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }
}
