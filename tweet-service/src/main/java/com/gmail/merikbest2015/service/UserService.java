package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    User getAuthUser();

    User getUserById(Long userId);

    Boolean isUserExists(Long userId);

    boolean isUserHavePrivateProfile(Long userId);

    boolean isMyProfileBlockedByUser(Long userId);

    Page<UserProjection> getLikedUsersByTweet(Tweet tweet, Pageable pageable);

    Page<UserProjection> getRetweetedUsersByTweet(Tweet tweet, Pageable pageable);
}
