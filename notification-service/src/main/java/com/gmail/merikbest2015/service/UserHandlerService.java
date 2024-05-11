package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.event.UserNotificationEvent;
import com.gmail.merikbest2015.model.User;

public interface UserHandlerService {

    void handleUpdateUser(UpdateUserEvent userEvent);

    User getOrCreateUser(UserNotificationEvent user);
}
