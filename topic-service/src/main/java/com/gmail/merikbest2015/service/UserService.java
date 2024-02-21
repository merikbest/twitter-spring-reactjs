package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.event.UpdateUserEvent;

public interface UserService {

    boolean isUserExists(Long userId);

    boolean isMyProfileBlockedByUser(Long userId);

    boolean isUserHavePrivateProfile(Long userId);

    void handleUpdateUser(UpdateUserEvent updateUserEvent);

    void handleBlockUser(BlockUserEvent blockUserEvent);
}
