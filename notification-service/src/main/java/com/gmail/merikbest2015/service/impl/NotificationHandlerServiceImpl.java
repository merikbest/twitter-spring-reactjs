package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.broker.producer.UserNotificationProducer;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.feign.WebSocketClient;
import com.gmail.merikbest2015.mapper.NotificationHandlerMapper;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.service.ListsHandlerService;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import com.gmail.merikbest2015.service.UserHandlerService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.gmail.merikbest2015.constants.WebsocketConstants.TOPIC_NOTIFICATIONS;

@Service
@RequiredArgsConstructor
public class NotificationHandlerServiceImpl implements NotificationHandlerService {

    private final NotificationRepository notificationRepository;
    private final UserNotificationProducer userNotificationProducer;
    private final UserHandlerService userHandlerService;
    private final ListsHandlerService listsHandlerService;
    private final WebSocketClient webSocketClient;
    private final NotificationHandlerMapper notificationHandlerMapper;

    @Override
    @Transactional
    public void handleListsNotification(ListsNotificationEvent notificationEvent) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        boolean isNotificationExists = notificationRepository.isListNotificationExists(
                notificationEvent.getNotifiedUser().getId(),
                notificationEvent.getLists().getId(),
                authUserId,
                NotificationType.LISTS
        );
        if (!isNotificationExists) {
            User notifiedUser = userHandlerService.getOrCreateUser(notificationEvent.getNotifiedUser());
            User user = userHandlerService.getOrCreateUser(notificationEvent.getUser());
            Lists list = listsHandlerService.getOrCreateList(notificationEvent.getLists());
            Notification notification = new Notification();
            notification.setNotificationType(NotificationType.LISTS);
            notification.setNotifiedUser(notifiedUser);
            notification.setUser(user);
            notification.setList(list);
            notificationRepository.save(notification);
            userNotificationProducer.increaseNotificationsCount(notification.getNotifiedUser().getId());
            NotificationResponse notificationResponse = notificationHandlerMapper.convertToNotificationListResponse(notification, notificationEvent.isNotificationCondition());
            webSocketClient.send(TOPIC_NOTIFICATIONS + notificationResponse.getNotifiedUserId(), notificationResponse);
        }
    }

    @Override
    public void handleFollowUserNotification(FollowUserNotificationEvent followUserNotificationEvent) {

    }
}
