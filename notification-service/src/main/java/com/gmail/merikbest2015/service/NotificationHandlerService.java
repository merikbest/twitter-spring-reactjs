package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.ListsNotificationEvent;

public interface NotificationHandlerService {

    void handleListsNotification(ListsNotificationEvent listsNotificationEvent);

    void handleFollowUserNotification(FollowUserNotificationEvent followUserNotificationEvent);
}
