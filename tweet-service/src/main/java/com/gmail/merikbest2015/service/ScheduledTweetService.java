package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ScheduledTweetService {

    Page<TweetProjection> getScheduledTweets(Pageable pageable);

    TweetProjection createScheduledTweet(Tweet tweet);

    TweetProjection updateScheduledTweet(Tweet tweet);

    String deleteScheduledTweets(List<Long> tweetsIds);
}
