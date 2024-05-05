package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;

import java.util.List;

public interface UserClientService {

    void increaseNotificationsCount(Long userId);

    void increaseMentionsCount(Long userId);

    NotificationUserResponse getNotificationUser(Long userId);

    UserResponse getUserResponseById(Long userId);

    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    List<Long> getUserIdsWhichUserSubscribed();

    void resetNotificationCount();

    void resetMentionCount();
}
