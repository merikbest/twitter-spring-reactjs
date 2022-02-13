package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import java.time.LocalDateTime;

public interface BookmarkProjection {
    Long getId();
    LocalDateTime getLikeTweetDate();
    TweetProjection getTweet();
}
