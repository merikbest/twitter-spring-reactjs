package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.Notification;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    User getUserById(Long userId);

    List<User> getUsers();

    List<User> getRelevantUsers();

    List<User> searchUsersByUsername(String username);

    User startUseTwitter(Long userId);

    List<Tweet> getUserTweets(Long userId);

    List<Tweet> getUserLikedTweets(Long userId);

    List<Tweet> getUserMediaTweets(Long userId);

    List<Tweet> getUserRetweetsAndReplies(Long userId);

    List<Notification> getUserNotifications();

    List<Tweet> getUserBookmarks();

    User processUserBookmarks(Long tweetId);

    Image uploadImage(MultipartFile multipartFile);

    User updateUserProfile(User userInfo);

    Notification follow(Long userId);

    User pinTweet(Long tweetId);

    User unpinTweet(Long tweetId);
}
