package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.UserEvent;

public interface UserService {

    boolean isUserExists(Long userId);

    boolean isMyProfileBlockedByUser(Long userId);

    boolean isUserHavePrivateProfile(Long userId);

    void handleUser(UserEvent userEvent);
}
