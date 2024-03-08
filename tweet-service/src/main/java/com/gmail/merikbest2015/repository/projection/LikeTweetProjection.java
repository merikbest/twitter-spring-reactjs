package com.gmail.merikbest2015.repository.projection;

import java.time.LocalDateTime;

public interface LikeTweetProjection {
    LocalDateTime getLikeTweetDate();
    TweetProjection getTweet();
}
