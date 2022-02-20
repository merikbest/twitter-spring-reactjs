package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserPhoneResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationsProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.*;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final TweetMapper tweetMapper;
    private final AuthenticationMapper authenticationMapper;
    private final UserService userService;
    private final UserSettingsService userSettingsService;

    private ImageResponse convertToImageResponse(Image image) {
        return modelMapper.map(image, ImageResponse.class);
    }

    NotificationProjectionResponse convertToNotificationResponse(Notification notification) {
        return modelMapper.map(notification, NotificationProjectionResponse.class);
    }

    User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    BaseUserProjectionResponse convertToBaseUserResponse(BaseUserProjection user) {
        return modelMapper.map(user, BaseUserProjectionResponse.class);
    }

    private UserProfileProjectionResponse convertToUserProfileResponse(UserProfileProjection user) {
        return modelMapper.map(user, UserProfileProjectionResponse.class);
    }

    private UserProjectionResponse convertToUserResponse(UserProjection user) {
        return modelMapper.map(user, UserProjectionResponse.class);
    }

    private List<UserProjectionResponse> convertUserListToResponse(List<UserProjection> users) {
        return users.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    private List<BaseUserProjectionResponse> convertBaseUserListToResponse(List<BaseUserProjection> users) {
        return users.stream()
                .map(this::convertToBaseUserResponse)
                .collect(Collectors.toList());
    }

    private TweetHeaderProjectionResponse getTweetHeaderProjectionResponse(List<TweetProjection> tweets, Integer totalPages) {
        List<TweetProjectionResponse> tweetResponses = tweetMapper.convertListToProjectionResponse(tweets);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        return new TweetHeaderProjectionResponse(tweetResponses, responseHeaders);
    }

    public UserProfileProjectionResponse getUserById(Long userId) {
        return convertToUserProfileResponse(userService.getUserById(userId));
    }

    public List<UserProjectionResponse> getUsers() {
        return convertUserListToResponse(userService.getUsers());
    }

    public ImageResponse uploadImage(MultipartFile multipartFile) {
        return convertToImageResponse(userService.uploadImage(multipartFile));
    }

    public AuthUserProjectionResponse updateUserProfile(UserRequest userRequest) {
        AuthUserProjection authUserProjection = userService.updateUserProfile(convertToEntity(userRequest));
        return modelMapper.map(authUserProjection, AuthUserProjectionResponse.class);
    }

    public Boolean startUseTwitter() {
        return userService.startUseTwitter();
    }

    public TweetHeaderProjectionResponse getUserTweets(Long userId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(userService.getUserTweets(userId, pageable));
    }

    public TweetHeaderProjectionResponse getUserLikedTweets(Long userId, Pageable pageable) {
        Page<LikeTweetProjection> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
        return getTweetHeaderProjectionResponse(tweets, userLikedTweets.getTotalPages());
    }

    public TweetHeaderProjectionResponse getUserMediaTweets(Long userId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(userService.getUserMediaTweets(userId, pageable));
    }

    public TweetHeaderProjectionResponse getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(userService.getUserRetweetsAndReplies(userId, pageable));
    }

    public TweetHeaderProjectionResponse getUserBookmarks(Pageable pageable) {
        Page<BookmarkProjection> bookmarks = userService.getUserBookmarks(pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        bookmarks.getContent().forEach(bookmark -> tweets.add(bookmark.getTweet()));
        return getTweetHeaderProjectionResponse(tweets, bookmarks.getTotalPages());
    }

    public Boolean processUserBookmarks(Long tweetId) {
        return userService.processUserBookmarks(tweetId);
    }

    public List<BaseUserProjectionResponse> getFollowers(Long userId) {
        return convertBaseUserListToResponse(userService.getFollowers(userId));
    }

    public List<BaseUserProjectionResponse> getFollowing(Long userId) {
        return convertBaseUserListToResponse(userService.getFollowing(userId));
    }

    public NotificationProjectionResponse processFollow(Long userId) {
        Map<String, Object> notificationDetails = userService.processFollow(userId);
        NotificationProjectionResponse notification = convertToNotificationResponse((Notification) notificationDetails.get("notification"));
        notification.getUserToFollow().setFollower((Boolean) notificationDetails.get("isFollower"));
        return notification;
    }

    public List<BaseUserProjectionResponse> overallFollowers(Long userId) {
        return convertBaseUserListToResponse(userService.overallFollowers(userId));
    }

    public UserProfileProjectionResponse processFollowRequestToPrivateProfile(Long userId) {
        return convertToUserProfileResponse(userService.processFollowRequestToPrivateProfile(userId));
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

    public List<UserProjectionResponse> getRelevantUsers() {
        return convertUserListToResponse(userService.getRelevantUsers());
    }

    public List<UserProjectionResponse> searchUsersByUsername(String username) {
        return convertUserListToResponse(userService.searchUsersByUsername(username));
    }

    public Long processPinTweet(Long tweetId) {
        return userService.processPinTweet(tweetId);
    }

    @SuppressWarnings("unchecked")
    public NotificationsProjectionResponse getUserNotifications() {
        Map<String, Object> userNotifications = userService.getUserNotifications();
        NotificationsProjectionResponse notificationsResponse = new NotificationsProjectionResponse();
        List<NotificationProjection> notificationProjections = (List<NotificationProjection>) userNotifications.get("notifications");
        List<NotificationProjectionResponse> notifications = notificationProjections.stream()
                .map(user -> modelMapper.map(user.getNotification(), NotificationProjectionResponse.class))
                .collect(Collectors.toList());
        List<TweetAuthorProjection> tweetAuthorsProjections = (List<TweetAuthorProjection>) userNotifications.get("tweetAuthors");
        List<NotificationUserProjectionResponse> tweetAuthors = tweetAuthorsProjections.stream()
                .map(user -> modelMapper.map(user.getTweetAuthor(), NotificationUserProjectionResponse.class))
                .collect(Collectors.toList());
        notificationsResponse.setNotifications(notifications);
        notificationsResponse.setTweetAuthors(tweetAuthors);
        return notificationsResponse;
    }

    public TweetHeaderProjectionResponse getNotificationsFromTweetAuthors(Pageable pageable) {
        Page<TweetsProjection> tweetsProjections = userService.getNotificationsFromTweetAuthors(pageable);
        List<TweetProjection> tweets = tweetsProjections.getContent().stream()
                .map(TweetsProjection::getTweet)
                .collect(Collectors.toList());
        return getTweetHeaderProjectionResponse(tweets, tweetsProjections.getTotalPages());
    }

    public String updateUsername(SettingsRequest request) {
        return userSettingsService.updateUsername(request.getUsername());
    }

    public AuthenticationProjectionResponse updateEmail(SettingsRequest request) {
        return authenticationMapper.getAuthenticationProjectionResponse(userSettingsService.updateEmail(request.getEmail()));
    }

    public UserPhoneResponse updatePhone(SettingsRequest request) {
        Map<String, Object> phoneParams = userSettingsService.updatePhone(request.getCountryCode(), request.getPhone());
        return new UserPhoneResponse((String) phoneParams.get("countryCode"), (Long) phoneParams.get("phone"));
    }

    public String updateCountry(SettingsRequest request) {
        return userSettingsService.updateCountry(request.getCountry());
    }

    public String updateGender(SettingsRequest request) {
        return userSettingsService.updateGender(request.getGender());
    }

    public String updateLanguage(SettingsRequest request) {
        return userSettingsService.updateLanguage(request.getLanguage());
    }

    public boolean updateDirectMessageRequests(SettingsRequest request) {
        return userSettingsService.updateDirectMessageRequests(request.isMutedDirectMessages());
    }

    public boolean updatePrivateProfile(SettingsRequest request) {
        return userSettingsService.updatePrivateProfile(request.isPrivateProfile());
    }

    public ColorSchemeType updateColorScheme(SettingsRequest request) {
        return userSettingsService.updateColorScheme(request.getColorScheme());
    }

    public BackgroundColorType updateBackgroundColor(SettingsRequest request) {
        return userSettingsService.updateBackgroundColor(request.getBackgroundColor());
    }

    public List<BlockedUserProjectionResponse> getBlockList() {
        return userService.getBlockList().stream()
                .map(user -> modelMapper.map(user, BlockedUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public Boolean processBlockList(Long userId) {
        return userService.processBlockList(userId);
    }

    public List<MutedUserProjectionResponse> getMutedList() {
        return userService.getMutedList().stream()
                .map(user -> modelMapper.map(user, MutedUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public Boolean processMutedList(Long userId) {
        return userService.processMutedList(userId);
    }

    public UserDetailProjectionResponse getUserDetails(Long userId) {
        return modelMapper.map(userService.getUserDetails(userId), UserDetailProjectionResponse.class);
    }
}
