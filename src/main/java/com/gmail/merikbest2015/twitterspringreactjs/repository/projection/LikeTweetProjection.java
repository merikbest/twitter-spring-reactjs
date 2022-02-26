package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;

import java.time.LocalDateTime;

public interface LikeTweetProjection {
    Long getId();
    LocalDateTime getBookmarkDate();
    TweetProjection getTweet();
}
