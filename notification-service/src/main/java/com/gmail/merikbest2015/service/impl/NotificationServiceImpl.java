package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.notification.NotificationUserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.service.NotificationService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserClient userClient;
    private final ListsClient listsClient;
    private final TweetClient tweetClient;
    private final BasicMapper basicMapper;

    @Override
    public NotificationResponse sendListNotification(Notification notification, boolean isAddedToList) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!notification.getNotifiedUserId().equals(authUserId)) {
            boolean isNotificationExists = notificationRepository.isNotificationExists(
                    notification.getNotifiedUserId(), notification.getListId(), notification.getNotificationType());

            if (!isNotificationExists) {
                notificationRepository.save(notification);
                userClient.increaseNotificationsCount(notification.getUserId());
                return convertToNotificationListResponse(notification, isAddedToList);
            }
        }
        return convertToNotificationListResponse(notification, isAddedToList);
    }

    @Override
    public NotificationResponse sendTweetNotification(Notification notification, boolean isTweetLiked) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!notification.getNotifiedUserId().equals(authUserId)) {
            boolean isNotificationExists = notificationRepository.isNotificationExists(
                    notification.getNotifiedUserId(), notification.getTweetId(), notification.getNotificationType());

            if (!isNotificationExists) {
                notificationRepository.save(notification);
                userClient.increaseNotificationsCount(notification.getUserId());
                return convertToNotificationTweetResponse(notification, isTweetLiked);
            }
        }
        return convertToNotificationTweetResponse(notification, isTweetLiked);
    }

    @Override
    public void sendTweetNotificationToSubscribers(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        List<Long> subscribersIds = userClient.getSubscribersByUserId(authUserId);

        if (!subscribersIds.contains(null)) {
            subscribersIds.forEach(subscriberId -> {
                Notification notification = new Notification();
                notification.setNotificationType(NotificationType.TWEET);
                notification.setUserId(authUserId);
                notification.setTweetId(tweetId);
                notification.setNotifiedUserId(subscriberId);
                notificationRepository.save(notification);
                userClient.increaseNotificationsCount(subscriberId);
            });
        }
    }

    private NotificationResponse convertToNotificationListResponse(Notification notification, boolean isAddedToList) {
        NotificationUserResponse notificationUser = userClient.getNotificationUser(notification.getUserId());
        NotificationListResponse notificationList = listsClient.getNotificationList(notification.getListId());
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setUser(notificationUser);
        notificationResponse.setList(notificationList);
        notificationResponse.setAddedToList(isAddedToList);
        return notificationResponse;
    }

    private NotificationResponse convertToNotificationTweetResponse(Notification notification, boolean isTweetLiked) {
        NotificationUserResponse notificationUser = userClient.getNotificationUser(notification.getUserId());
        NotificationTweetResponse notificationTweet = tweetClient.getNotificationTweet(notification.getTweetId());
        notificationTweet.setNotificationCondition(isTweetLiked);
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setUser(notificationUser);
        notificationResponse.setTweet(notificationTweet);
        return notificationResponse;
    }
}
