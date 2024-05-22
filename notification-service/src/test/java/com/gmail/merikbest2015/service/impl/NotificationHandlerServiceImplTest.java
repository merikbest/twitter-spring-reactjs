package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.event.ListsNotificationDto;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static com.gmail.merikbest2015.constants.WebsocketConstants.TOPIC_NOTIFICATIONS;
import static org.mockito.Mockito.*;

public class NotificationHandlerServiceImplTest extends AbstractServiceTest {

    @Autowired
    private NotificationHandlerService notificationHandlerService;

    @Test
    public void handleListsNotification() {
        ListsNotificationEvent event = ListsNotificationEvent.builder()
                .notifiedUser(UserNotificationDto.builder()
                        .id(3L)
                        .username(TestConstants.USERNAME)
                        .avatar(TestConstants.AVATAR_SRC_1)
                        .build())
                .user(UserNotificationDto.builder()
                        .id(TestConstants.USER_ID)
                        .username(TestConstants.USERNAME)
                        .avatar(TestConstants.AVATAR_SRC_2)
                        .build())
                .lists(ListsNotificationDto.builder()
                        .id(TestConstants.LIST_ID)
                        .listName(TestConstants.LIST_NAME)
                        .build())
                .notificationCondition(true)
                .build();
        User notifiedUser = mockUser(event.getNotifiedUser());
        User user = mockUser(event.getUser());
        Lists lists = mockLists(event.getLists());
        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.LISTS);
        notification.setNotifiedUser(notifiedUser);
        notification.setUser(user);
        notification.setList(lists);
        NotificationResponse response = mockNotificationListResponse();
        when(notificationRepository.isNotificationExists(
                event.getNotifiedUser().getId(),
                event.getUser().getId(),
                NotificationType.LISTS,
                event.getLists().getId()
        )).thenReturn(false);
        when(userRepository.findById(event.getNotifiedUser().getId())).thenReturn(Optional.of(notifiedUser));
        when(userRepository.findById(event.getUser().getId())).thenReturn(Optional.of(user));
        when(listsRepository.findById(event.getLists().getId())).thenReturn(Optional.of(lists));
        when(notificationHandlerMapper.convertToNotificationListResponse(notification, event.isNotificationCondition()))
                .thenReturn(response);
        notificationHandlerService.handleListsNotification(event);
        verify(notificationRepository, times(1)).save(notification);
        verify(userNotificationProducer, times(1)).increaseNotificationsCount(notification.getNotifiedUser().getId());
        verify(notificationHandlerMapper, times(1)).convertToNotificationListResponse(
                notification, event.isNotificationCondition());
        verify(webSocketClient, times(1)).send(TOPIC_NOTIFICATIONS + response.getNotifiedUser().getId(), response);
    }

    private static User mockUser(UserNotificationDto userNotificationDto) {
        User user = new User();
        user.setId(userNotificationDto.getId());
        user.setUsername(userNotificationDto.getUsername());
        user.setAvatar(userNotificationDto.getAvatar());
        return user;
    }

    private static Lists mockLists(ListsNotificationDto listsNotificationDto) {
        Lists lists = new Lists();
        lists.setId(listsNotificationDto.getId());
        lists.setListName(listsNotificationDto.getListName());
        return lists;
    }

    private static NotificationResponse mockNotificationListResponse() {
        NotificationResponse response = new NotificationResponse();
        response.setNotificationType(NotificationType.LISTS);
        response.setNotifiedUser(mockNotifiedUserResponse());
        response.setUser(mockUserResponse());
        response.setList(mockListResponse());
        return response;
    }

    private static NotificationUserResponse mockNotifiedUserResponse() {
        NotificationUserResponse response = new NotificationUserResponse();
        response.setId(3L);
        response.setUsername(TestConstants.USERNAME);
        response.setAvatar(TestConstants.AVATAR_SRC_1);
        return response;
    }

    private static NotificationUserResponse mockUserResponse() {
        NotificationUserResponse response = new NotificationUserResponse();
        response.setId(TestConstants.USER_ID);
        response.setUsername(TestConstants.USERNAME);
        response.setAvatar(TestConstants.AVATAR_SRC_2);
        return response;
    }

    private static NotificationListResponse mockListResponse() {
        NotificationListResponse response = new NotificationListResponse();
        response.setId(TestConstants.LIST_ID);
        response.setListName(TestConstants.LIST_NAME);
        return response;
    }
}
