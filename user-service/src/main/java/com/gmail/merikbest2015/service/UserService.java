package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.event.UpdateTweetCountEvent;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserProfileProjection getUserById(Long userId);

    Page<UserProjection> getUsers(Pageable pageable);

    List<UserProjection> getRelevantUsers();

    <T> Page<T> searchUsersByUsername(String username, Pageable pageable, Class<T> type);

    Map<String, Object> searchByText(String text);

    List<CommonUserProjection> getSearchResults(SearchTermsRequest request);

    Boolean startUseTwitter();

    AuthUserProjection updateUserProfile(User userInfo);

    Boolean processSubscribeToNotifications(Long userId);

    Long processPinTweet(Long tweetId);

    UserDetailProjection getUserDetails(Long userId);

    void handleUpdateTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId);

    void handleUpdateLikeTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId);

    void handleUpdateMediaTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId);
}
