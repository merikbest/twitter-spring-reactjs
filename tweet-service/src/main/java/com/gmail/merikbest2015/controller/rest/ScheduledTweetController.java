package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.mapper.ScheduledTweetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_TWEETS)
public class ScheduledTweetController {

    private final ScheduledTweetMapper scheduledTweetMapper;

    @GetMapping(PathConstants.SCHEDULE)
    public ResponseEntity<List<TweetResponse>> getScheduledTweets(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<TweetResponse> response = scheduledTweetMapper.getScheduledTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(PathConstants.SCHEDULE)
    public ResponseEntity<TweetResponse> createScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(scheduledTweetMapper.createScheduledTweet(tweetRequest));
    }

    @PutMapping(PathConstants.SCHEDULE)
    public ResponseEntity<TweetResponse> updateScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(scheduledTweetMapper.updateScheduledTweet(tweetRequest));
    }

    @DeleteMapping(PathConstants.SCHEDULE)
    public ResponseEntity<String> deleteScheduledTweets(@RequestBody TweetDeleteRequest tweetRequest) {
        return ResponseEntity.ok(scheduledTweetMapper.deleteScheduledTweets(tweetRequest));
    }
}
