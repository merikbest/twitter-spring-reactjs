package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import java.time.LocalDateTime;

public interface LikeTweetProjection {
    Long getId();
    LocalDateTime getBookmarkDate();
    TweetProjection getTweet();
}
