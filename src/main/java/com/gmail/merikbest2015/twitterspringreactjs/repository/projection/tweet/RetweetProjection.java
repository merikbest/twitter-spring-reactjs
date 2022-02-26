package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet;

import java.time.LocalDateTime;

public interface RetweetProjection {
    Long getId();
    LocalDateTime getRetweetDate();
    TweetUserProjection getTweet();
}
