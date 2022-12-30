package com.gmail.merikbest2015.projection;

import java.time.LocalDateTime;

public interface RetweetProjection {
    Long getId();
    LocalDateTime getRetweetDate();
    TweetUserProjection getTweet();
}
