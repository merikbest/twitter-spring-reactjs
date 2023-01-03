package com.gmail.merikbest2015.commons.projection;

import java.time.LocalDateTime;

public interface LikeTweetProjection {
    Long getId();
    LocalDateTime getLikeTweetDate();
    TweetProjection getTweet();
}
