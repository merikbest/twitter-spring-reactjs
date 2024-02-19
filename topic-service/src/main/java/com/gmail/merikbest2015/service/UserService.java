package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.UserEvent;

public interface UserService {

    boolean isUserExists(Long userId);

    void handleUser(UserEvent userEvent);
}
