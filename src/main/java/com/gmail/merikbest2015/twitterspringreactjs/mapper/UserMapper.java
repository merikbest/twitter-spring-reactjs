package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.Notification;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final TweetMapper tweetMapper;
    private final UserService userService;

    private ImageResponse convertToImageResponse(Image image) {
        return modelMapper.map(image, ImageResponse.class);
    }

    private NotificationResponse convertToNotificationResponse(Notification notification) {
        return modelMapper.map(notification, NotificationResponse.class);
    }

    private List<NotificationResponse> convertListToNotificationResponseDto(List<Notification> notifications) {
        return notifications.stream()
                .map(this::convertToNotificationResponse)
                .collect(Collectors.toList());
    }

    UserResponse convertToUserResponse(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    private List<UserResponse> convertListToResponseDto(List<User> users) {
        return users.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    public UserResponse getUserById(Long userId) {
        return convertToUserResponse(userService.getUserById(userId));
    }

    public List<UserResponse> getUsers() {
        return convertListToResponseDto(userService.getUsers());
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

    public List<TweetResponse> getUserTweets(Long userId) {
        return tweetMapper.convertListToResponseDto(userService.getUserTweets(userId));
    }

    public List<TweetResponse> getUserLikedTweets(Long userId) {
        return tweetMapper.convertListToResponseDto(userService.getUserLikedTweets(userId));
    }

    public List<TweetResponse> getUserMediaTweets(Long userId) {
        return tweetMapper.convertListToResponseDto(userService.getUserMediaTweets(userId));
    }

    public List<TweetResponse> getUserRetweetsAndReplies(Long userId) {
        return tweetMapper.convertListToResponseDto(userService.getUserRetweetsAndReplies(userId));
    }

    public List<TweetResponse> getUserBookmarks() {
        return tweetMapper.convertListToResponseDto(userService.getUserBookmarks());
    }

    public UserResponse processUserBookmarks(Long tweetId) {
        return convertToUserResponse(userService.processUserBookmarks(tweetId));
    }

    public UserResponse follow(Long userId) {
        return convertToUserResponse(userService.follow(userId));
    }

    public UserResponse unfollow(Long userId) {
        return convertToUserResponse(userService.unfollow(userId));
    }

    public List<UserResponse> getRelevantUsers() {
        return convertListToResponseDto(userService.getRelevantUsers());
    }

    public List<UserResponse> searchUsersByUsername(String username) {
        return convertListToResponseDto(userService.searchUsersByUsername(username));
    }

    public UserResponse pinTweet(Long tweetId) {
        return convertToUserResponse(userService.pinTweet(tweetId));
    }

    public UserResponse unpinTweet(Long tweetId) {
        return convertToUserResponse(userService.unpinTweet(tweetId));
    }

    public List<NotificationResponse> getUserNotifications() {
        return convertListToNotificationResponseDto(userService.getUserNotifications());
    }
}
