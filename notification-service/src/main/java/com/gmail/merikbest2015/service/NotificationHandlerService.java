package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.TweetNotificationEvent;

public interface NotificationHandlerService {

    void handleListsNotification(ListsNotificationEvent listsNotificationEvent, String authId);

    void handleFollowUserNotification(FollowUserNotificationEvent followUserNotificationEvent, String authId);

    void handleTweetNotification(TweetNotificationEvent tweetNotificationEvent, String authId);
}
