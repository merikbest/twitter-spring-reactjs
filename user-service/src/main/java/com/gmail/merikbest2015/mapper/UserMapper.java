package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.ImageResponse;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.request.UserRequest;
import com.gmail.merikbest2015.dto.response.*;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final BasicMapper basicMapper;
    private final AuthenticationMapper authenticationMapper;
    private final UserService userService;

    public UserProfileResponse getUserById(Long userId) {
        UserProfileProjection user = userService.getUserById(userId);
        return basicMapper.convertToResponse(user, UserProfileResponse.class);
    }

    public HeaderResponse<UserResponse> getUsers(Pageable pageable) {
        Page<UserProjection> users = userService.getUsers(pageable);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public List<UserResponse> getRelevantUsers() {
        List<UserProjection> users = userService.getRelevantUsers();
        return basicMapper.convertToResponseList(users, UserResponse.class);
    }

    public HeaderResponse<UserResponse> searchUsersByUsername(String username, Pageable pageable) {
        Page<UserProjection> users = userService.searchUsersByUsername(username, pageable, UserProjection.class);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public Boolean startUseTwitter() {
        return userService.startUseTwitter();
    }

//    public HeaderResponse<TweetUserResponse> getUserTweets(Long userId, Pageable pageable) {
//        Page<TweetUserProjection> tweets = userService.getUserTweets(userId, pageable);
//        return basicMapper.getHeaderResponse(tweets, TweetUserResponse.class);
//    }
//
//    public HeaderResponse<TweetResponse> getUserLikedTweets(Long userId, Pageable pageable) {
//        Page<LikeTweetProjection> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
//        List<TweetProjection> tweets = new ArrayList<>();
//        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
//        return basicMapper.getHeaderResponse(tweets, userLikedTweets.getTotalPages(), TweetResponse.class);
//    }
//
//    public HeaderResponse<TweetResponse> getUserMediaTweets(Long userId, Pageable pageable) {
//        Page<TweetProjection> tweets = userService.getUserMediaTweets(userId, pageable);
//        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
//    }
//
//    public HeaderResponse<TweetUserResponse> getUserRetweetsAndReplies(Long userId, Pageable pageable) {
//        Page<TweetUserProjection> tweets = userService.getUserRetweetsAndReplies(userId, pageable);
//        return basicMapper.getHeaderResponse(tweets, TweetUserResponse.class);
//    }
//
//    public HeaderResponse<NotificationResponse> getUserNotifications(Pageable pageable) {
//        Page<NotificationProjection> notifications = userService.getUserNotifications(pageable);
//        return basicMapper.getHeaderResponse(notifications, NotificationResponse.class);
//    }

    public AuthUserResponse updateUserProfile(UserRequest userRequest) {
        User user = basicMapper.convertToResponse(userRequest, User.class);
        AuthUserProjection authUserProjection = userService.updateUserProfile(user);
        return basicMapper.convertToResponse(authUserProjection, AuthUserResponse.class);
    }

//
//    public List<TweetImageResponse> getUserTweetImages(Long userId) {
//        List<TweetImageProjection> tweets = userService.getUserTweetImages(userId);
//        return basicMapper.convertToResponseList(tweets, TweetImageResponse.class);
//    }

    public HeaderResponse<UserResponse> getFollowers(Long userId, Pageable pageable) {
        Page<UserProjection> users = userService.getFollowers(userId, pageable);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public HeaderResponse<UserResponse> getFollowing(Long userId, Pageable pageable) {
        Page<UserProjection> users = userService.getFollowing(userId, pageable);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public HeaderResponse<FollowerUserResponse> getFollowerRequests(Pageable pageable) {
        Page<FollowerUserProjection> followers = userService.getFollowerRequests(pageable);
        return basicMapper.getHeaderResponse(followers, FollowerUserResponse.class);
    }

    public Boolean processFollow(Long userId) {
        return userService.processFollow(userId);
    }


//    public HeaderResponse<TweetUserResponse> getUserTweets(Long userId, Pageable pageable) {
//        Page<TweetUserProjection> tweets = userService.getUserTweets(userId, pageable);
//        return basicMapper.getHeaderResponse(tweets, TweetUserResponse.class);
//    }
//
//    public HeaderResponse<TweetResponse> getUserLikedTweets(Long userId, Pageable pageable) {
//        Page<LikeTweetProjection> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
//        List<TweetProjection> tweets = new ArrayList<>();
//        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
//        return basicMapper.getHeaderResponse(tweets, userLikedTweets.getTotalPages(), TweetResponse.class);
//    }
//
//    public HeaderResponse<TweetResponse> getUserMediaTweets(Long userId, Pageable pageable) {
//        Page<TweetProjection> tweets = userService.getUserMediaTweets(userId, pageable);
//        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
//    }

//    public HeaderResponse<TweetResponse> getUserBookmarks(Pageable pageable) {
//        Page<BookmarkProjection> bookmarks = userService.getUserBookmarks(pageable);
//        List<TweetProjection> tweets = new ArrayList<>();
//        bookmarks.getContent().forEach(bookmark -> tweets.add(bookmark.getTweet()));
//        return basicMapper.getHeaderResponse(tweets, bookmarks.getTotalPages(), TweetResponse.class);
//    }
//
//    public Boolean processUserBookmarks(Long tweetId) {
//        return userService.processUserBookmarks(tweetId);
//    }

    public List<UserResponse> overallFollowers(Long userId) {
        List<BaseUserProjection> users = userService.overallFollowers(userId);
        return basicMapper.convertToResponseList(users, UserResponse.class);
    }

    public UserProfileResponse processFollowRequestToPrivateProfile(Long userId) {
        UserProfileProjection user = userService.processFollowRequestToPrivateProfile(userId);
        return basicMapper.convertToResponse(user, UserProfileResponse.class);
    }

    public String acceptFollowRequest(Long userId) {
        return userService.acceptFollowRequest(userId);
    }

    public String declineFollowRequest(Long userId) {
        return userService.declineFollowRequest(userId);
    }

    public Boolean processSubscribeToNotifications(Long userId) {
        return userService.processSubscribeToNotifications(userId);
    }

    public Long processPinTweet(Long tweetId) {
        return userService.processPinTweet(tweetId);
    }

//    public HeaderResponse<NotificationResponse> getUserNotifications(Pageable pageable) {
//        Page<NotificationProjection> notifications = userService.getUserNotifications(pageable);
//        return basicMapper.getHeaderResponse(notifications, NotificationResponse.class);
//    }
//
//    public List<NotificationUserResponse> getTweetAuthorsNotifications() {
//        List<TweetAuthorsProjection> tweetAuthorsNotifications = userService.getTweetAuthorsNotifications();
//        List<TweetAuthorsProjection.AuthorProjection> tweetAuthorsProjection = tweetAuthorsNotifications.contains(null)
//                ? new ArrayList<>()
//                : tweetAuthorsNotifications.stream()
//                .map(TweetAuthorsProjection::getTweetAuthor)
//                .collect(Collectors.toList());
//        return basicMapper.convertToResponseList(tweetAuthorsProjection, NotificationUserResponse.class);
//    }
//
//    public NotificationInfoResponse getUserNotificationById(Long notificationId) {
//        NotificationInfoProjection notification = userService.getUserNotificationById(notificationId);
//        return basicMapper.convertToResponse(notification, NotificationInfoResponse.class);
//    }
//
//    public HeaderResponse<TweetResponse> getNotificationsFromTweetAuthors(Pageable pageable) {
//        Page<TweetsProjection> tweetsProjections = userService.getNotificationsFromTweetAuthors(pageable);
//        List<TweetProjection> tweets = tweetsProjections.getContent().stream()
//                .map(TweetsProjection::getTweet)
//                .collect(Collectors.toList());
//        return basicMapper.getHeaderResponse(tweets, tweetsProjections.getTotalPages(), TweetResponse.class);
//    }
//
//    public HeaderResponse<TweetResponse> getUserMentions(Pageable pageable) {
//        Page<TweetProjection> tweets = userService.getUserMentions(pageable);
//        return basicMapper.getHeaderResponse(tweets.getContent(), tweets.getTotalPages(), TweetResponse.class);
//    }

    public HeaderResponse<BlockedUserResponse> getBlockList(Pageable pageable) {
        Page<BlockedUserProjection> blockList = userService.getBlockList(pageable);
        return basicMapper.getHeaderResponse(blockList, BlockedUserResponse.class);
    }

    public Boolean processBlockList(Long userId) {
        return userService.processBlockList(userId);
    }

//    public HeaderResponse<MutedUserResponse> getMutedList(Pageable pageable) {
//        Page<MutedUserProjection> mutedList = userService.getMutedList(pageable);
//        return basicMapper.getHeaderResponse(mutedList, MutedUserResponse.class);
//    }
//
//    public Boolean processMutedList(Long userId) {
//        return userService.processMutedList(userId);
//    }
//
//    public UserDetailResponse getUserDetails(Long userId) {
//        UserDetailProjection userDetails = userService.getUserDetails(userId);
//        return basicMapper.convertToResponse(userDetails, UserDetailResponse.class);
//    }
}
