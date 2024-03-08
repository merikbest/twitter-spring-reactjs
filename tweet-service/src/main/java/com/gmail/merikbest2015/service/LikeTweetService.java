package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LikeTweetService {

    Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable);

    Page<UserProjection> getLikedUsersByTweetId(Long tweetId, Pageable pageable);

    NotificationResponse likeTweet(Long tweetId);
}
