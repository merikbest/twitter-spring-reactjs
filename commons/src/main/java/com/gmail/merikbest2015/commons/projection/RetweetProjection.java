package com.gmail.merikbest2015.commons.projection;

import java.time.LocalDateTime;

public interface RetweetProjection {
    Long getId();
    LocalDateTime getRetweetDate();
    TweetUserProjection getTweet();
}
