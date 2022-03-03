package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationInfoResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.BookmarkProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification.NotificationInfoProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification.NotificationProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetsProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.*;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    private User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    private <T, S> S convertProjectionToResponse(T user, Class<S> type) {
        return modelMapper.map(user, type);
    }

    private <T, S> List<S> convertProjectionListToResponseList(List<T> users, Class<S> type) {
        return users.stream()
                .map(user -> convertProjectionToResponse(user, type))
                .collect(Collectors.toList());
    }

    public UserProfileResponse getUserById(Long userId) {
        UserProfileProjection user = userService.getUserById(userId);
        return convertProjectionToResponse(user, UserProfileResponse.class);
    }

    public List<UserResponse> getUsers() {
        List<UserProjection> users = userService.getUsers();
        return convertProjectionListToResponseList(users, UserResponse.class);
    }

    public ImageResponse uploadImage(MultipartFile multipartFile) {
        Image image = userService.uploadImage(multipartFile);
        return convertProjectionToResponse(image, ImageResponse.class);
    }

    public AuthUserResponse updateUserProfile(UserRequest userRequest) {
        AuthUserProjection authUserProjection = userService.updateUserProfile(convertToEntity(userRequest));
        return convertProjectionToResponse(authUserProjection, AuthUserResponse.class);
    }

    public Boolean startUseTwitter() {
        return userService.startUseTwitter();
    }

    public TweetHeaderResponse<TweetUserResponse> getUserTweets(Long userId, Pageable pageable) {
        Page<TweetUserProjection> tweets = userService.getUserTweets(userId, pageable);
        return tweetMapper.getTweetHeaderResponse(tweets, TweetUserResponse.class);
    }

    public TweetHeaderResponse<TweetResponse> getUserLikedTweets(Long userId, Pageable pageable) {
        Page<LikeTweetProjection> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
        return tweetMapper.getTweetHeaderResponse(tweets, userLikedTweets.getTotalPages(), TweetResponse.class);
    }

    public TweetHeaderResponse<TweetResponse> getUserMediaTweets(Long userId, Pageable pageable) {
        Page<TweetProjection> tweets = userService.getUserMediaTweets(userId, pageable);
        return tweetMapper.getTweetHeaderResponse(tweets, TweetResponse.class);
    }

    public TweetHeaderResponse<TweetUserResponse> getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        Page<TweetUserProjection> tweets = userService.getUserRetweetsAndReplies(userId, pageable);
        return tweetMapper.getTweetHeaderResponse(tweets, TweetUserResponse.class);
    }

    public TweetHeaderResponse<TweetResponse> getUserBookmarks(Pageable pageable) {
        Page<BookmarkProjection> bookmarks = userService.getUserBookmarks(pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        bookmarks.getContent().forEach(bookmark -> tweets.add(bookmark.getTweet()));
        return tweetMapper.getTweetHeaderResponse(tweets, bookmarks.getTotalPages(), TweetResponse.class);
    }

    public Boolean processUserBookmarks(Long tweetId) {
        return userService.processUserBookmarks(tweetId);
    }

    public List<UserResponse> getFollowers(Long userId) {
        List<UserProjection> users = userService.getFollowers(userId);
        return convertProjectionListToResponseList(users, UserResponse.class);
    }

    public List<UserResponse> getFollowing(Long userId) {
        List<UserProjection> users = userService.getFollowing(userId);
        return convertProjectionListToResponseList(users, UserResponse.class);
    }

    public List<FollowerUserResponse> getFollowerRequests() {
        List<FollowerUserProjection> followers = userService.getFollowerRequests();
        return convertProjectionListToResponseList(followers, FollowerUserResponse.class);
    }

    public NotificationResponse processFollow(Long userId) {
        Map<String, Object> notificationDetails = userService.processFollow(userId);
        Notification notification = (Notification) notificationDetails.get("notification");
        NotificationResponse notificationResponse = convertProjectionToResponse(notification, NotificationResponse.class);
        notificationResponse.getUserToFollow().setFollower((Boolean) notificationDetails.get("isFollower"));
        return notificationResponse;
    }

    public List<UserResponse> overallFollowers(Long userId) {
        List<BaseUserProjection> users = userService.overallFollowers(userId);
        return convertProjectionListToResponseList(users, UserResponse.class);
    }

    public UserProfileResponse processFollowRequestToPrivateProfile(Long userId) {
        UserProfileProjection user = userService.processFollowRequestToPrivateProfile(userId);
        return convertProjectionToResponse(user, UserProfileResponse.class);
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
        List<UserProjection> users = userService.getRelevantUsers();
        return convertProjectionListToResponseList(users, UserResponse.class);
    }

    public List<UserResponse> searchUsersByUsername(String username) {
        List<UserProjection> users = userService.searchUsersByUsername(username);
        return convertProjectionListToResponseList(users, UserResponse.class);
    }

    public Long processPinTweet(Long tweetId) {
        return userService.processPinTweet(tweetId);
    }

    @SuppressWarnings("unchecked")
    public NotificationsResponse getUserNotifications() {
        Map<String, Object> notificationsDetails = userService.getUserNotifications();
        NotificationsResponse notificationsResponse = new NotificationsResponse();
        List<NotificationProjection> userNotifications = (List<NotificationProjection>) notificationsDetails.get("notifications");
        List<NotificationProjection.Notification> notificationsProjection = userNotifications.contains(null)
                ? new ArrayList<>()
                : userNotifications.stream()
                    .map(NotificationProjection::getNotification)
                    .collect(Collectors.toList());
        List<NotificationResponse> notifications = convertProjectionListToResponseList(notificationsProjection, NotificationResponse.class);
        List<TweetAuthorProjection> tweetAuthorsNotifications = (List<TweetAuthorProjection>) notificationsDetails.get("tweetAuthors");
        List<TweetAuthorProjection.AuthorProjection> tweetAuthorsProjection = tweetAuthorsNotifications.contains(null)
                ? new ArrayList<>()
                : tweetAuthorsNotifications.stream()
                    .map(TweetAuthorProjection::getTweetAuthor)
                    .collect(Collectors.toList());
        List<NotificationUserResponse> tweetAuthors = convertProjectionListToResponseList(tweetAuthorsProjection, NotificationUserResponse.class);
        notificationsResponse.setNotifications(notifications);
        notificationsResponse.setTweetAuthors(tweetAuthors);
        return notificationsResponse;
    }

    public NotificationInfoResponse getUserNotificationById(Long notificationId) {
        NotificationInfoProjection notification = userService.getUserNotificationById(notificationId);
        return convertProjectionToResponse(notification, NotificationInfoResponse.class);
    }

    public TweetHeaderResponse<TweetResponse> getNotificationsFromTweetAuthors(Pageable pageable) {
        Page<TweetsProjection> tweetsProjections = userService.getNotificationsFromTweetAuthors(pageable);
        List<TweetProjection> tweets = tweetsProjections.getContent().stream()
                .map(TweetsProjection::getTweet)
                .collect(Collectors.toList());
        return tweetMapper.getTweetHeaderResponse(tweets, tweetsProjections.getTotalPages(), TweetResponse.class);
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
        List<BlockedUserProjection> blockList = userService.getBlockList();
        return convertProjectionListToResponseList(blockList, BlockedUserResponse.class);
    }

    public Boolean processBlockList(Long userId) {
        return userService.processBlockList(userId);
    }

    public List<MutedUserResponse> getMutedList() {
        List<MutedUserProjection> mutedList = userService.getMutedList();
        return convertProjectionListToResponseList(mutedList, MutedUserResponse.class);
    }

    public Boolean processMutedList(Long userId) {
        return userService.processMutedList(userId);
    }

    public UserDetailResponse getUserDetails(Long userId) {
        UserDetailProjection userDetails = userService.getUserDetails(userId);
        return convertProjectionToResponse(userDetails, UserDetailResponse.class);
    }
}
