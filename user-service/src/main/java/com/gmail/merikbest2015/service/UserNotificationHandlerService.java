package com.gmail.merikbest2015.service;

public interface UserNotificationHandlerService {

    void increaseNotificationsCount(Long notifiedUserEventId);

    void increaseMentionsCount(Long notifiedUserEventId);

    void resetNotificationCount(Long notifiedUserEventId);

    void resetMentionCount(Long notifiedUserEventId);
}
