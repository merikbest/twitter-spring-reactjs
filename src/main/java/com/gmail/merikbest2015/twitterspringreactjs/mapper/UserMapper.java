package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.notification.NotificationProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.notification.NotificationUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.notification.NotificationsProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.refactor.NotificationResponseI;
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

import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final TweetMapper tweetMapper;
    private final UserService userService;
    private final UserSettingsService userSettingsService;

    private ImageResponse convertToImageResponse(Image image) {
        return modelMapper.map(image, ImageResponse.class);
    }

    NotificationResponseI convertToNotificationResponseI(Notification notification) {
        return modelMapper.map(notification, NotificationResponseI.class);
    }

    NotificationResponse convertToNotificationResponse(Notification notification) {
        NotificationResponse notificationResponse = modelMapper.map(notification, NotificationResponse.class);

        if (notification.getTweet() != null) {
            if (notification.getTweet().getQuoteTweet() != null) {
                TweetResponseCommon tweetResponseCommon = tweetMapper.convertToTweetResponseCommon(notification.getTweet().getQuoteTweet());
                notificationResponse.getTweet().setQuoteTweet(tweetResponseCommon);
            } else {
                notificationResponse.getTweet().setQuoteTweet(null);
            }
        }
        return notificationResponse;
    }

    private List<NotificationResponse> convertListToNotificationResponse(List<Notification> notifications) {
        return notifications.stream()
                .map(this::convertToNotificationResponse)
                .collect(Collectors.toList());
    }

    UserResponse convertToUserResponse(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    private List<UserResponse> convertUserListToResponse(Collection<User> users) {
        return users.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    private TweetHeaderResponse getTweetHeaderResponse(List<Tweet> tweets, Integer totalPages) {
        List<TweetResponse> tweetResponses = tweetMapper.convertListToResponse(tweets);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        return new TweetHeaderResponse(tweetResponses, responseHeaders);
    }

    private TweetHeaderProjectionResponse getTweetHeaderProjectionResponse(List<TweetProjection> tweets, Integer totalPages) {
        List<TweetProjectionResponse> tweetResponses = tweetMapper.convertListToProjectionResponse(tweets);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        return new TweetHeaderProjectionResponse(tweetResponses, responseHeaders);
    }

    public UserProfileProjectionResponse getUserById(Long userId) {
        UserProfileProjection user = userService.getUserById(userId);
        return modelMapper.map(user, UserProfileProjectionResponse.class);
    }

    public List<UserProjectionResponse> getUsers() {
        List<UserProjection> users = userService.getUsers();
        return users.stream()
                .map(user -> modelMapper.map(user, UserProjectionResponse.class))
                .collect(Collectors.toList());
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
        Page<TweetProjection> userTweets = userService.getUserTweets(userId, pageable);
        return getTweetHeaderProjectionResponse(userTweets.getContent(), userTweets.getTotalPages());
    }

    public TweetHeaderProjectionResponse getUserLikedTweets(Long userId, Pageable pageable) {
        Page<LikeTweetProjection> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
        List<TweetProjection> tweets = new ArrayList<>();
        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
        return getTweetHeaderProjectionResponse(tweets, userLikedTweets.getTotalPages());
    }

    public TweetHeaderProjectionResponse getUserMediaTweets(Long userId, Pageable pageable) {
        Page<TweetProjection> mediaTweets = userService.getUserMediaTweets(userId, pageable);
        return getTweetHeaderProjectionResponse(mediaTweets.getContent(), mediaTweets.getTotalPages());
    }

    public TweetHeaderProjectionResponse getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        Page<TweetProjection> retweetsAndReplies = userService.getUserRetweetsAndReplies(userId, pageable);
        return getTweetHeaderProjectionResponse(retweetsAndReplies.getContent(), retweetsAndReplies.getTotalPages());
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
        List<BaseUserProjection> followers = userService.getFollowers(userId);
        return followers.stream()
                .map(user -> modelMapper.map(user, BaseUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public List<BaseUserProjectionResponse> getFollowing(Long userId) {
        List<BaseUserProjection> following = userService.getFollowing(userId);
        return following.stream()
                .map(user -> modelMapper.map(user, BaseUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public NotificationResponseI processFollow(Long userId) {
        Map<String, Object> notificationDetails = userService.processFollow(userId);
        NotificationResponseI notification = convertToNotificationResponseI((Notification) notificationDetails.get("notification"));
        notification.getUserToFollow().setFollower((Boolean) notificationDetails.get("isFollower"));
        return notification;
    }

    public List<BaseUserProjectionResponse> overallFollowers(Long userId) {
        List<BaseUserProjection> users = userService.overallFollowers(userId);
        return users.stream()
                .map(user -> modelMapper.map(user, BaseUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public UserProfileProjectionResponse processFollowRequestToPrivateProfile(Long userId) {
        UserProfileProjection userProfileProjection = userService.processFollowRequestToPrivateProfile(userId);
        return modelMapper.map(userProfileProjection, UserProfileProjectionResponse.class);
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
        List<UserProjection> relevantUsers = userService.getRelevantUsers();
        return relevantUsers.stream()
                .map(relevantUser -> modelMapper.map(relevantUser, UserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public List<UserProjectionResponse> searchUsersByUsername(String username) {
        List<UserProjection> baseUserProjections = userService.searchUsersByUsername(username);
        return baseUserProjections.stream()
                .map(baseUserProjection -> modelMapper.map(baseUserProjection, UserProjectionResponse.class))
                .collect(Collectors.toList());
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
        Map<String, Object> credentials = userSettingsService.updateEmail(request.getEmail());
        AuthenticationProjectionResponse response = new AuthenticationProjectionResponse();
        response.setUser(modelMapper.map(credentials.get("user"), AuthUserProjectionResponse.class));
        response.setToken((String) credentials.get("token"));
        return response;
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
        List<BlockedUserProjection> blockList = userService.getBlockList();
        return blockList.stream()
                .map(user -> modelMapper.map(user, BlockedUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public Boolean processBlockList(Long userId) {
        return userService.processBlockList(userId);
    }

    public List<MutedUserProjectionResponse> getMutedList() {
        List<MutedUserProjection> mutedList = userService.getMutedList();
        return mutedList.stream()
                .map(user -> modelMapper.map(user, MutedUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public Boolean processMutedList(Long userId) {
        return userService.processMutedList(userId);
    }

    // Projection
    UserDetailProjectionResponse convertToProjectionResponse(UserDetailProjection user) {
        return modelMapper.map(user, UserDetailProjectionResponse.class);
    }

    public UserDetailProjectionResponse getUserDetails(Long userId) {
        return convertToProjectionResponse(userService.getUserDetails(userId));
    }
}
