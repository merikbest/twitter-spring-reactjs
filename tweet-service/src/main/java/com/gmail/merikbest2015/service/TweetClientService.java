package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.ChatTweetResponse;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.notification.NotificationTweetResponse;
import org.springframework.data.domain.Pageable;

public interface TweetClientService {

//    Optional<Tweet> getTweetById(Long userId);
//
//    List<TweetsUserProjection> getTweetsByUserId(Long userId);
//
//    Optional<TweetsUserProjection> getPinnedTweetByUserId(Long userId);
//
//    Page<TweetProjection> getAllUserMediaTweets(TweetPageableRequest request);
//
//    Page<TweetProjection> getUserMentions(TweetPageableRequest request);
//
//    List<TweetImageProjection> getUserTweetImages(TweetPageableRequest request);
//
//    List<TweetsUserProjection> getRepliesByUserId(Long userId);
//
//    List<TweetProjection> getNotificationsFromTweetAuthors(Long userId);
//
//    List<TweetProjection> getTweetsByIds(List<Long> tweetIds);
//
//    Page<TweetProjection> getTweetsByUserIds(TweetUserIdsRequest request, Pageable pageable);

    // NEW
    TweetResponse getTweetById(Long tweetId);

    HeaderResponse<TweetResponse> getTweetsByIds(IdsRequest request, Pageable pageable);

    NotificationTweetResponse getNotificationTweet(Long tweetId);

    Boolean isTweetExists(Long tweetId);

    ChatTweetResponse getChatTweet(Long tweetId);
}
