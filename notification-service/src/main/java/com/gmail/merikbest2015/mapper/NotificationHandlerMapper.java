package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.model.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationHandlerMapper {

    private final BasicMapper basicMapper;

    public NotificationResponse convertToNotificationListResponse(Notification notification, boolean isAddedToList) {
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setAddedToList(isAddedToList);
        return notificationResponse;
    }

    public NotificationResponse convertToNotificationUserResponse(Notification notification, boolean isFollowed) {
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.getUserToFollow().setFollower(isFollowed);
        return notificationResponse;
    }

    public NotificationResponse convertToNotificationTweetResponse(Notification notification, boolean isTweetLiked) {
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.getTweet().setNotificationCondition(isTweetLiked);
        return notificationResponse;
    }
}
