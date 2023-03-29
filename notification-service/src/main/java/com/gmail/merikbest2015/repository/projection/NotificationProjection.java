package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface NotificationProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    Long getUserId();
    Long getUserToFollowId();
    Long getTweetId();
    Long getListId();

    @Value("#{target.userId == null ? null : @notificationServiceHelper.getNotificationUser(target.userId)}")
    NotificationUserResponse getUser();

    @Value("#{target.userToFollowId == null ? null : @notificationServiceHelper.getNotificationUser(target.userToFollowId)}")
    NotificationUserResponse getUserToFollow();

    @Value("#{target.tweetId == null ? null : @notificationServiceHelper.getNotificationTweet(target.tweetId)}")
    NotificationTweetResponse getTweet();

    @Value("#{target.listId == null ? null : @notificationServiceHelper.getNotificationList(target.listId)}")
    NotificationListResponse getList();
}
