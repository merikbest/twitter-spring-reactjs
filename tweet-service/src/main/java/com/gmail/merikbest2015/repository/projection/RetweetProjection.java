package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface RetweetProjection {
    Long getId();
    LocalDateTime getRetweetDate();
    Long getTweetId();

    @Value("#{@tweetRepository.getTweetById(target.tweetId, TweetUserProjection.class).get()}")
    TweetUserProjection getTweet();
}
