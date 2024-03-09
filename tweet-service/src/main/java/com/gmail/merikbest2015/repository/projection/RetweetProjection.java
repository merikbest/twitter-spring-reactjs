package com.gmail.merikbest2015.repository.projection;

import java.time.LocalDateTime;

public interface RetweetProjection {
    LocalDateTime getRetweetDate();
    TweetUserProjection getTweet();
}
