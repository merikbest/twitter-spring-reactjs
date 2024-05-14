package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RetweetService {

    Page<TweetUserProjection> getUserRetweetsAndReplies(Long userId, Pageable pageable);

    Page<UserProjection> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable);

    Tweet retweet(Long tweetId);
}
