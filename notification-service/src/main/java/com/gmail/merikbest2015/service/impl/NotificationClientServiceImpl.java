package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.service.NotificationClientService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationClientServiceImpl implements NotificationClientService {

    private final NotificationRepository notificationRepository;
    private final UserClient userClient;
    private final ListsClient listsClient;
    private final TweetClient tweetClient;
    private final BasicMapper basicMapper;

    @Override
    public NotificationResponse sendNotification(Notification notification, boolean notificationCondition) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!notification.getNotifiedUserId().equals(authUserId)) {
            boolean isNotificationExists;

            if (notification.getNotificationType().equals(NotificationType.LISTS)) {
                isNotificationExists = notificationRepository.isListNotificationExists(
                        notification.getNotifiedUserId(), notification.getListId(), authUserId, notification.getNotificationType());
            } else if (notification.getNotificationType().equals(NotificationType.FOLLOW)) {
                isNotificationExists = notificationRepository.isUserNotificationExists(
                        notification.getNotifiedUserId(), notification.getUserToFollowId(), authUserId, notification.getNotificationType());
            } else {
                isNotificationExists = notificationRepository.isTweetNotificationExists(
                        notification.getNotifiedUserId(), notification.getTweetId(), authUserId, notification.getNotificationType());
            }
            if (!isNotificationExists) {
                notificationRepository.save(notification);
                userClient.increaseNotificationsCount(notification.getNotifiedUserId());
                return convertToNotificationResponse(notification, notificationCondition);
            }
        }
        return convertToNotificationResponse(notification, notificationCondition);
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

    private NotificationResponse convertToNotificationResponse(Notification notification, boolean notificationCondition) {
        if (notification.getNotificationType().equals(NotificationType.LISTS)) {
            return convertToNotificationListResponse(notification, notificationCondition);
        } else if (notification.getNotificationType().equals(NotificationType.FOLLOW)) {
            return convertToNotificationUserResponse(notification, notificationCondition);
        } else {
            return convertToNotificationTweetResponse(notification, notificationCondition);
        }
    }

    private NotificationResponse convertToNotificationListResponse(Notification notification, boolean isAddedToList) {
        NotificationUserResponse userResponse = userClient.getNotificationUser(notification.getUserId());
        NotificationListResponse listResponse = listsClient.getNotificationList(notification.getListId());
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setUser(userResponse);
        notificationResponse.setList(listResponse);
        notificationResponse.setAddedToList(isAddedToList);
        return notificationResponse;
    }

    private NotificationResponse convertToNotificationUserResponse(Notification notification, boolean isFollowed) {
        NotificationUserResponse userResponse = userClient.getNotificationUser(notification.getUserId());
        NotificationUserResponse followerResponse = userClient.getNotificationUser(notification.getUserToFollowId());
        followerResponse.setFollower(isFollowed);
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setUser(userResponse);
        notificationResponse.setUserToFollow(followerResponse);
        return notificationResponse;
    }

    private NotificationResponse convertToNotificationTweetResponse(Notification notification, boolean isTweetLiked) {
        NotificationUserResponse userResponse = userClient.getNotificationUser(notification.getUserId());
        NotificationTweetResponse tweetResponse = tweetClient.getNotificationTweet(notification.getTweetId());
        tweetResponse.setNotificationCondition(isTweetLiked);
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setUser(userResponse);
        notificationResponse.setTweet(tweetResponse);
        return notificationResponse;
    }
}
