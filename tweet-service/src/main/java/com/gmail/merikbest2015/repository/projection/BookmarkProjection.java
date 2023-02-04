package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface BookmarkProjection {
    Long getId();
    LocalDateTime getBookmarkDate();
    Long getTweetId();

    @Value("#{@tweetRepository.getTweetById(target.tweetId, TweetProjection.class).get()}")
    TweetProjection getTweet();
}
