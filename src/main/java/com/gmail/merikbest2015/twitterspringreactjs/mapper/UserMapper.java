package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.*;
import com.gmail.merikbest2015.twitterspringreactjs.model.*;
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

    public UserResponse getUserById(Long userId) {
        return convertToUserResponse(userService.getUserById(userId));
    }

    public List<UserResponse> getUsers() {
        return convertUserListToResponse(userService.getUsers());
    }

    public ImageResponse uploadImage(MultipartFile multipartFile) {
        return convertToImageResponse(userService.uploadImage(multipartFile));
    }

    public UserResponse updateUserProfile(UserRequest userRequest) {
        return convertToUserResponse(userService.updateUserProfile(convertToEntity(userRequest)));
    }

    public UserResponse startUseTwitter(Long userId) {
        return convertToUserResponse(userService.startUseTwitter(userId));
    }

    public TweetHeaderResponse getUserTweets(Long userId, Pageable pageable) {
        Page<Tweet> userTweets = userService.getUserTweets(userId, pageable);
        return getTweetHeaderResponse(userTweets.getContent(), userTweets.getTotalPages());
    }

    public TweetHeaderResponse getUserLikedTweets(Long userId, Pageable pageable) {
        Page<LikeTweet> userLikedTweets = userService.getUserLikedTweets(userId, pageable);
        List<Tweet> tweets = new ArrayList<>();
        userLikedTweets.getContent().forEach(likeTweet -> tweets.add(likeTweet.getTweet()));
        return getTweetHeaderResponse(tweets, userLikedTweets.getTotalPages());
    }

    public TweetHeaderResponse getUserMediaTweets(Long userId, Pageable pageable) {
        Page<Tweet> mediaTweets = userService.getUserMediaTweets(userId, pageable);
        return getTweetHeaderResponse(mediaTweets.getContent(), mediaTweets.getTotalPages());
    }

    public TweetHeaderResponse getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        Page<Tweet> retweetsAndReplies = userService.getUserRetweetsAndReplies(userId, pageable);
        return getTweetHeaderResponse(retweetsAndReplies.getContent(), retweetsAndReplies.getTotalPages());
    }

    public TweetHeaderResponse getUserBookmarks(Pageable pageable) {
        Page<Bookmark> bookmarks = userService.getUserBookmarks(pageable);
        List<Tweet> tweets = new ArrayList<>();
        bookmarks.getContent().forEach(bookmark -> tweets.add(bookmark.getTweet()));
        return getTweetHeaderResponse(tweets, bookmarks.getTotalPages());
    }

    public UserResponse processUserBookmarks(Long tweetId) {
        return convertToUserResponse(userService.processUserBookmarks(tweetId));
    }

    public List<UserResponse> getFollowers(Long userId) {
        return convertUserListToResponse(userService.getFollowers(userId));
    }

    public List<UserResponse> getFollowing(Long userId) {
        return convertUserListToResponse(userService.getFollowing(userId));
    }

    public NotificationResponse processFollow(Long userId) {
        return convertToNotificationResponse(userService.processFollow(userId));
    }

    public List<UserResponse> overallFollowers(Long userId) {
        return convertUserListToResponse(userService.overallFollowers(userId));
    }

    public UserResponse processFollowRequestToPrivateProfile(Long userId) {
        return convertToUserResponse(userService.processFollowRequestToPrivateProfile(userId));
    }

    public UserResponse acceptFollowRequest(Long userId) {
        return convertToUserResponse(userService.acceptFollowRequest(userId));
    }

    public UserResponse declineFollowRequest(Long userId) {
        return convertToUserResponse(userService.declineFollowRequest(userId));
    }

    public UserResponse processSubscribeToNotifications(Long userId) {
        return convertToUserResponse(userService.processSubscribeToNotifications(userId));
    }

    public List<UserResponse> getRelevantUsers() {
        return convertUserListToResponse(userService.getRelevantUsers());
    }

    public List<UserResponse> searchUsersByUsername(String username) {
        return convertUserListToResponse(userService.searchUsersByUsername(username));
    }

    public UserResponse processPinTweet(Long tweetId) {
        return convertToUserResponse(userService.processPinTweet(tweetId));
    }

    @SuppressWarnings("unchecked")
    public NotificationsResponse getUserNotifications() {
        Map<String, Object> userNotifications = userService.getUserNotifications();
        NotificationsResponse notificationsResponse = new NotificationsResponse();
        notificationsResponse.setNotifications(convertListToNotificationResponse((List<Notification>) userNotifications.get("notifications")));
        notificationsResponse.setTweetAuthors(convertUserListToResponse((Set<User>) userNotifications.get("tweetAuthors")));
        return notificationsResponse;
    }

    public TweetHeaderResponse getNotificationsFromTweetAuthors(Pageable pageable) {
        Page<Tweet> tweets = userService.getNotificationsFromTweetAuthors(pageable);
        return getTweetHeaderResponse(tweets.getContent(), tweets.getTotalPages());
    }

    public String updateUsername(SettingsRequest request) {
        return userSettingsService.updateUsername(request.getUsername());
    }

    public AuthenticationResponse updateEmail(SettingsRequest request) {
        Map<String, Object> credentials = userSettingsService.updateEmail(request.getEmail());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setUser(convertToUserResponse((User) credentials.get("user")));
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

    public List<UserResponse> getBlockList() {
        return convertUserListToResponse(userService.getBlockList());
    }

    public UserResponse processBlockList(Long userId) {
        return convertToUserResponse(userService.processBlockList(userId));
    }

    public List<UserResponse> getMutedList() {
        return convertUserListToResponse(userService.getMutedList());
    }

    public UserResponse processMutedList(Long userId) {
        return convertToUserResponse(userService.processMutedList(userId));
    }
}
