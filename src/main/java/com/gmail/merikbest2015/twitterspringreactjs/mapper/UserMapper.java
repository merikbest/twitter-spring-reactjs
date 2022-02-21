package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
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

    NotificationResponse convertToNotificationResponse(Notification notification) {
        return modelMapper.map(notification, NotificationResponse.class);
    }

    User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    BaseUserResponse convertToBaseUserResponse(BaseUserProjection user) {
        return modelMapper.map(user, BaseUserResponse.class);
    }

    private UserProfileResponse convertToUserProfileResponse(UserProfileProjection user) {
        return modelMapper.map(user, UserProfileResponse.class);
    }

    private UserResponse convertToUserResponse(UserProjection user) {
        return modelMapper.map(user, UserResponse.class);
    }

    private List<UserResponse> convertUserListToResponse(List<UserProjection> users) {
        return users.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    private List<BaseUserResponse> convertBaseUserListToResponse(List<BaseUserProjection> users) {
        return users.stream()
                .map(this::convertToBaseUserResponse)
                .collect(Collectors.toList());
    }

    private TweetHeaderResponse getTweetHeaderProjectionResponse(List<TweetProjection> tweets, Integer totalPages) {
        List<TweetResponse> tweetResponses = tweetMapper.convertListToProjectionResponse(tweets);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        return new TweetHeaderResponse(tweetResponses, responseHeaders);
    }

    public UserProfileResponse getUserById(Long userId) {
        return convertToUserProfileResponse(userService.getUserById(userId));
    }

    public List<UserResponse> getUsers() {
        return convertUserListToResponse(userService.getUsers());
    }

    public ImageResponse uploadImage(MultipartFile multipartFile) {
        return convertToImageResponse(userService.uploadImage(multipartFile));
    }

    public AuthUserResponse updateUserProfile(UserRequest userRequest) {
        AuthUserProjection authUserProjection = userService.updateUserProfile(convertToEntity(userRequest));
        return modelMapper.map(authUserProjection, AuthUserResponse.class);
    }

    public Boolean startUseTwitter() {
        return userService.startUseTwitter();
    }

    public TweetHeaderResponse getUserTweets(Long userId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(userService.getUserTweets(userId, pageable));
    }

    public TweetHeaderResponse getUserLikedTweets(Long userId, Pageable pageable) {
        Page<LikeTweetProjection> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
        return getTweetHeaderProjectionResponse(tweets, userLikedTweets.getTotalPages());
    }

    public TweetHeaderResponse getUserMediaTweets(Long userId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(userService.getUserMediaTweets(userId, pageable));
    }

    public TweetHeaderResponse getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(userService.getUserRetweetsAndReplies(userId, pageable));
    }

    public TweetHeaderResponse getUserBookmarks(Pageable pageable) {
        Page<BookmarkProjection> bookmarks = userService.getUserBookmarks(pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        bookmarks.getContent().forEach(bookmark -> tweets.add(bookmark.getTweet()));
        return getTweetHeaderProjectionResponse(tweets, bookmarks.getTotalPages());
    }

    public Boolean processUserBookmarks(Long tweetId) {
        return userService.processUserBookmarks(tweetId);
    }

    public List<BaseUserResponse> getFollowers(Long userId) {
        return convertBaseUserListToResponse(userService.getFollowers(userId));
    }

    public List<BaseUserResponse> getFollowing(Long userId) {
        return convertBaseUserListToResponse(userService.getFollowing(userId));
    }

    public List<FollowerUserResponse> getFollowerRequests() {
        return userService.getFollowerRequests().stream()
                .map(user -> modelMapper.map(user, FollowerUserResponse.class))
                .collect(Collectors.toList());
    }

    public NotificationResponse processFollow(Long userId) {
        Map<String, Object> notificationDetails = userService.processFollow(userId);
        NotificationResponse notification = convertToNotificationResponse((Notification) notificationDetails.get("notification"));
        notification.getUserToFollow().setFollower((Boolean) notificationDetails.get("isFollower"));
        return notification;
    }

    public List<BaseUserResponse> overallFollowers(Long userId) {
        return convertBaseUserListToResponse(userService.overallFollowers(userId));
    }

    public UserProfileResponse processFollowRequestToPrivateProfile(Long userId) {
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

    public List<UserResponse> getRelevantUsers() {
        return convertUserListToResponse(userService.getRelevantUsers());
    }

    public List<UserResponse> searchUsersByUsername(String username) {
        return convertUserListToResponse(userService.searchUsersByUsername(username));
    }

    public Long processPinTweet(Long tweetId) {
        return userService.processPinTweet(tweetId);
    }

    @SuppressWarnings("unchecked")
    public NotificationsResponse getUserNotifications() {
        Map<String, Object> userNotifications = userService.getUserNotifications();
        NotificationsResponse notificationsResponse = new NotificationsResponse();
        List<NotificationProjection> notificationProjections = (List<NotificationProjection>) userNotifications.get("notifications");
        List<NotificationResponse> notifications = notificationProjections.stream()
                .map(user -> modelMapper.map(user.getNotification(), NotificationResponse.class))
                .collect(Collectors.toList());
        List<TweetAuthorProjection> tweetAuthorsProjections = (List<TweetAuthorProjection>) userNotifications.get("tweetAuthors");
        List<NotificationUserResponse> tweetAuthors = tweetAuthorsProjections.stream()
                .map(user -> modelMapper.map(user.getTweetAuthor(), NotificationUserResponse.class))
                .collect(Collectors.toList());
        notificationsResponse.setNotifications(notifications);
        notificationsResponse.setTweetAuthors(tweetAuthors);
        return notificationsResponse;
    }

    public TweetHeaderResponse getNotificationsFromTweetAuthors(Pageable pageable) {
        Page<TweetsProjection> tweetsProjections = userService.getNotificationsFromTweetAuthors(pageable);
        List<TweetProjection> tweets = tweetsProjections.getContent().stream()
                .map(TweetsProjection::getTweet)
                .collect(Collectors.toList());
        return getTweetHeaderProjectionResponse(tweets, tweetsProjections.getTotalPages());
    }

    public String updateUsername(SettingsRequest request) {
        return userSettingsService.updateUsername(request.getUsername());
    }

    public AuthenticationResponse updateEmail(SettingsRequest request) {
        return authenticationMapper.getAuthenticationResponse(userSettingsService.updateEmail(request.getEmail()));
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

    public List<BlockedUserResponse> getBlockList() {
        return userService.getBlockList().stream()
                .map(user -> modelMapper.map(user, BlockedUserResponse.class))
                .collect(Collectors.toList());
    }

    public Boolean processBlockList(Long userId) {
        return userService.processBlockList(userId);
    }

    public List<MutedUserResponse> getMutedList() {
        return userService.getMutedList().stream()
                .map(user -> modelMapper.map(user, MutedUserResponse.class))
                .collect(Collectors.toList());
    }

    public Boolean processMutedList(Long userId) {
        return userService.processMutedList(userId);
    }

    public UserDetailResponse getUserDetails(Long userId) {
        return modelMapper.map(userService.getUserDetails(userId), UserDetailResponse.class);
    }
}
