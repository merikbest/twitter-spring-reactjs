package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    User getUserById(Long userId);

    List<User> getUsers();

    List<User> getRelevantUsers();

    List<User> searchUsersByUsername(String username);

    List<Tweet> getUserTweets(Long userId);

    List<Tweet> getUserLikedTweets(Long userId);

    List<Tweet> getUserMediaTweets(Long userId);

    Image uploadImage(MultipartFile multipartFile);

    User updateUserProfile(User userInfo);

    User follow(Long userId);

    User unfollow(Long userId);
}
