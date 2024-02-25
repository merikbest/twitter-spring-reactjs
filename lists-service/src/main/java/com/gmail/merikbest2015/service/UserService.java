package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.User;

public interface UserService {

    User getAuthUser();

    boolean isUserBlocked(Long userId, Long supposedBlockedUserId);

    boolean isUserHavePrivateProfile(Long userId, Long authUserId);

    void checkUserIsBlocked(Long userId, Long supposedBlockedUserId);

    void checkIsPrivateUserProfile(Long userId, Long authUserId);
}
