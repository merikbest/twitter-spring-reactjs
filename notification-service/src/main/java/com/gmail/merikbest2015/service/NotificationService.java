package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.model.Notification;

public interface NotificationService {

    NotificationResponse createListNotification(Notification notification, boolean isAddedToList);
}
