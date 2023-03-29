package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.model.Notification;

public interface NotificationClientService {

    NotificationResponse sendNotification(Notification notification, boolean notificationCondition);

    void sendTweetMentionNotification(Notification notification);

    void sendTweetNotificationToSubscribers(Long tweetId);
}
