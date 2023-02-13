package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface RetweetProjection {
    Long getId();
    LocalDateTime getRetweetDate();
    Long getTweetId();

    @Value("#{@tweetProjectionHelper.getTweetUserProjection(target.tweetId)}")
    TweetUserProjection getTweet();
}
