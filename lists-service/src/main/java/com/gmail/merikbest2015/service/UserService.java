package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.event.FollowUserEvent;
import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.model.User;

import java.util.List;

public interface UserService {

    User getAuthUser();

    User getUserById(Long userId);

    List<User> searchListMembersByUsername(String username);

    boolean isUserBlocked(Long userId, Long supposedBlockedUserId);

    boolean isUserHavePrivateProfile(Long userId, Long authUserId);

    void checkUserIsBlocked(Long userId, Long supposedBlockedUserId);

    void checkIsPrivateUserProfile(Long userId, Long authUserId);

    void handleUpdateUser(UpdateUserEvent updateUserEvent);

    void handleBlockUser(BlockUserEvent blockUserEvent, String authId);

    void handleFollowUser(FollowUserEvent followUserEvent, String authId);
}
