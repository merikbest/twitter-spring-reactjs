package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.repository.projection.tweet.TweetProjection;

import java.time.LocalDateTime;

public interface LikeTweetProjection {
    Long getId();
    LocalDateTime getLikeTweetDate();
    TweetProjection getTweet();
}
