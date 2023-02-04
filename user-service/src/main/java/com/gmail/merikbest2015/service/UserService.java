package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    UserProfileProjection getUserById(Long userId);

    Page<UserProjection> getUsers(Pageable pageable);

    List<UserProjection> getRelevantUsers();

    <T> Page<T> searchUsersByUsername(String username, Pageable pageable, Class<T> type);

    Boolean startUseTwitter();

    AuthUserProjection updateUserProfile(User userInfo);

    Boolean processSubscribeToNotifications(Long userId);

    Long processPinTweet(Long tweetId);

    UserDetailProjection getUserDetails(Long userId);
}
