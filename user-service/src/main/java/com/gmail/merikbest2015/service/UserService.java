package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserProfileProjection getUserById(Long userId);

    Page<UserProjection> getUsers(Pageable pageable);

    List<UserProjection> getRelevantUsers();

    <T> Page<T> searchUsersByUsername(String username, Pageable pageable, Class<T> type);

    Boolean startUseTwitter();

//    Page<TweetUserProjection> getUserTweets(Long userId, Pageable pageable);

//    Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable);

//    Page<TweetProjection> getUserMediaTweets(Long userId, Pageable pageable);

//    Page<TweetUserProjection> getUserRetweetsAndReplies(Long userId, Pageable pageable);

//    Page<NotificationProjection> getUserNotifications(Pageable pageable);

//    List<TweetAuthorsProjection> getTweetAuthorsNotifications();
//
//    NotificationInfoProjection getUserNotificationById(Long notificationId);
//
//    Page<TweetProjection> getUserMentions(Pageable pageable);
//
//    Page<TweetsProjection> getNotificationsFromTweetAuthors(Pageable pageable);
//
//    Page<BookmarkProjection> getUserBookmarks(Pageable pageable);
//
//    Boolean processUserBookmarks(Long tweetId);
//

    AuthUserProjection updateUserProfile(User userInfo);

//    List<TweetImageProjection> getUserTweetImages(Long userId);

    Page<UserProjection> getFollowers(Long userId, Pageable pageable);

    Page<UserProjection> getFollowing(Long userId, Pageable pageable);

    Page<FollowerUserProjection> getFollowerRequests(Pageable pageable);

    Boolean processFollow(Long userId);

    List<BaseUserProjection> overallFollowers(Long userId);

    UserProfileProjection processFollowRequestToPrivateProfile(Long userId);

    String acceptFollowRequest(Long userId);

    String declineFollowRequest(Long userId);

    Boolean processSubscribeToNotifications(Long userId);

    Long processPinTweet(Long tweetId);

    Page<BlockedUserProjection> getBlockList(Pageable pageable);

    Boolean processBlockList(Long userId);

    Page<MutedUserProjection> getMutedList(Pageable pageable);

    Boolean processMutedList(Long userId);

    UserDetailProjection getUserDetails(Long userId);
}
