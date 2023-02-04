package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RetweetService {

    Page<TweetUserProjection> getUserRetweetsAndReplies(Long userId, Pageable pageable);

    HeaderResponse<UserResponse> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable);

    NotificationResponse retweet(Long tweetId);
}
