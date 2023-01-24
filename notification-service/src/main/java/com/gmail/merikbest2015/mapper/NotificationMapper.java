package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.NotificationRequest;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationMapper {

    private final BasicMapper basicMapper;
    private final NotificationService notificationService;

    public NotificationResponse sendListNotification(NotificationRequest request) {
        Notification notification = basicMapper.convertToResponse(request, Notification.class);
        return notificationService.sendListNotification(notification, request.isNotificationCondition());
    }

    public NotificationResponse sendTweetNotification(NotificationRequest request) {
        Notification notification = basicMapper.convertToResponse(request, Notification.class);
        return notificationService.sendTweetNotification(notification, request.isNotificationCondition());
    }

    public void sendTweetNotificationToSubscribers(Long tweetId) {
        notificationService.sendTweetNotificationToSubscribers(tweetId);
    }
}
