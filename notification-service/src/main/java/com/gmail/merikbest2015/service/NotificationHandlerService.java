package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.event.*;

public interface NotificationHandlerService {

    void handleListsNotification(ListsNotificationEvent notificationEvent);

    void handleFollowUserNotification(FollowUserNotificationEvent notificationEvent);

    void handleTweetNotification(TweetNotificationEvent notificationEvent);

    void handleTweetSubscriberNotification(TweetSubscriberNotificationEvent notificationEvent);

    void handleTweetMentionNotification(TweetMentionNotificationEvent notificationEvent);
}
