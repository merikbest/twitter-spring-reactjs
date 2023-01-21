package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.notification.NotificationUserResponse;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.service.NotificationService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserClient userClient;
    private final ListsClient listsClient;
    private final BasicMapper basicMapper;

    @Override
    public NotificationResponse createListNotification(Notification notification, boolean isAddedToList) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        System.out.println(notification.getNotifiedUserId());
        System.out.println(notification.getUserId());

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

    private NotificationResponse convertToNotificationListResponse(Notification notification, boolean isAddedToList) {
        NotificationUserResponse notificationUser = userClient.getNotificationUser(notification.getUserId());
        NotificationListResponse notificationList = listsClient.getNotificationList(notification.getListId());
        NotificationResponse notificationResponse = basicMapper.convertToResponse(notification, NotificationResponse.class);
        notificationResponse.setUser(notificationUser);
        notificationResponse.setList(notificationList);
        notificationResponse.setAddedToList(isAddedToList);
        return notificationResponse;
    }
}
