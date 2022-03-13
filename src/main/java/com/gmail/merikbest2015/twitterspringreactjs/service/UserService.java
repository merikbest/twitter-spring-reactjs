package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.BookmarkProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification.NotificationInfoProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetImageProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetsProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.FollowerUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.MutedUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserProfileProjection getUserById(Long userId);

    List<UserProjection> getUsers();

    List<UserProjection> getRelevantUsers();

    List<UserProjection> searchUsersByUsername(String username);

    Boolean startUseTwitter();

    Page<TweetUserProjection> getUserTweets(Long userId, Pageable pageable);

    Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable);

    Page<TweetProjection> getUserMediaTweets(Long userId, Pageable pageable);

    Page<TweetUserProjection> getUserRetweetsAndReplies(Long userId, Pageable pageable);

    Map<String, Object> getUserNotifications();

    NotificationInfoProjection getUserNotificationById(Long notificationId);

    Page<TweetsProjection> getNotificationsFromTweetAuthors(Pageable pageable);

    Page<BookmarkProjection> getUserBookmarks(Pageable pageable);

    Boolean processUserBookmarks(Long tweetId);

    Image uploadImage(MultipartFile multipartFile);
    
    List<TweetImageProjection> getUserTweetImages(Long userId);

    AuthUserProjection updateUserProfile(User userInfo);

    List<UserProjection> getFollowers(Long userId);

    List<UserProjection> getFollowing(Long userId);

    Map<String, Object> processFollow(Long userId);

    List<BaseUserProjection> overallFollowers(Long userId);

    UserProfileProjection processFollowRequestToPrivateProfile(Long userId);

    String acceptFollowRequest(Long userId);

    String declineFollowRequest(Long userId);

    Boolean processSubscribeToNotifications(Long userId);

    Long processPinTweet(Long tweetId);

    List<BlockedUserProjection> getBlockList();

    Boolean processBlockList(Long userId);

    List<MutedUserProjection> getMutedList();

    Boolean processMutedList(Long userId);

    UserDetailProjection getUserDetails(Long userId);

    List<FollowerUserProjection> getFollowerRequests();
}
