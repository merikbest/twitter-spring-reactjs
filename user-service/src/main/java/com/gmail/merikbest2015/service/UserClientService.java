package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.event.UpdateUserEvent;

import java.util.List;

public interface UserClientService {

    UserResponse getUserResponseById(Long userId);

    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    List<Long> getUserIdsWhichUserSubscribed();

    List<UpdateUserEvent> getBatchUsers(Integer period, Integer page, Integer limit);
}
