package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import java.time.LocalDateTime;

public interface RetweetProjection {
    Long getId();
    LocalDateTime getRetweetDate();
    TweetProjection getTweet();
}
