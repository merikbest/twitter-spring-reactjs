package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.model.Notification;

public interface NotificationClientService {

    NotificationResponse sendListNotification(Notification notification, boolean isAddedToList);

    NotificationResponse sendTweetNotification(Notification notification, boolean isTweetLiked);

    void sendTweetNotificationToSubscribers(Long tweetId);
}
