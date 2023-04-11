package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.TweetProjection;

import java.util.List;

public interface PollService {

    TweetResponse createPoll(Long pollDateTime, List<String> choices, Tweet tweet);

    TweetProjection voteInPoll(Long tweetId, Long pollId, Long pollChoiceId);
}
