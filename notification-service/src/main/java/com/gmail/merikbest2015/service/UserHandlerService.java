package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.event.UpdateUserEvent;
import com.gmail.merikbest2015.commons.event.UserNotificationDto;
import com.gmail.merikbest2015.model.User;

public interface UserHandlerService {

    User handleNewOrUpdateUser(UpdateUserEvent userEvent);

    User getOrCreateUser(UserNotificationDto user);
}
