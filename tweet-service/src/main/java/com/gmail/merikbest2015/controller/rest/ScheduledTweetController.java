package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.mapper.ScheduledTweetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.SCHEDULE;
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_TWEETS;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_TWEETS)
public class ScheduledTweetController {

    private final ScheduledTweetMapper scheduledTweetMapper;

    @GetMapping(SCHEDULE)
    public ResponseEntity<List<TweetResponse>> getScheduledTweets(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<TweetResponse> response = scheduledTweetMapper.getScheduledTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(SCHEDULE)
    public ResponseEntity<TweetResponse> createScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(scheduledTweetMapper.createScheduledTweet(tweetRequest));
    }

    @PutMapping(SCHEDULE)
    public ResponseEntity<TweetResponse> updateScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(scheduledTweetMapper.updateScheduledTweet(tweetRequest));
    }

    @DeleteMapping(SCHEDULE)
    public ResponseEntity<String> deleteScheduledTweets(@RequestBody TweetDeleteRequest tweetRequest) {
        return ResponseEntity.ok(scheduledTweetMapper.deleteScheduledTweets(tweetRequest));
    }
}
