package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.service.NotificationClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationClientMapper {

    private final BasicMapper basicMapper;
    private final NotificationClientService notificationClientService;

    public NotificationResponse sendNotification(NotificationRequest request) {
        Notification notification = basicMapper.convertToResponse(request, Notification.class);
        return notificationClientService.sendNotification(notification, request.isNotificationCondition());
    }

    public void sendTweetMentionNotification(NotificationRequest request) {
        Notification notification = basicMapper.convertToResponse(request, Notification.class);
        notificationClientService.sendTweetMentionNotification(notification);
    }

    public void sendTweetNotificationToSubscribers(Long tweetId) {
        notificationClientService.sendTweetNotificationToSubscribers(tweetId);
    }
}
