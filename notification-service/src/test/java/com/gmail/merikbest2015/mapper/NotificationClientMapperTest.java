package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.service.NotificationClientService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.concurrent.Executors;

import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class NotificationClientMapperTest {

    @Autowired
    private NotificationClientMapper notificationClientMapper;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private NotificationClientService notificationClientService;

    @Test
    public void sendNotification() {
        NotificationRequest notificationRequest = getMockNotificationRequest();
        Notification notification = getMockNotification();
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setId(1L);
        notificationResponse.setNotificationType(NotificationType.LIKE);
        when(basicMapper.convertToResponse(notificationRequest, Notification.class)).thenReturn(notification);
        when(notificationClientService.sendNotification(notification, true)).thenReturn(notificationResponse);
        assertNotNull(notificationClientMapper.sendNotification(notificationRequest));
        verify(basicMapper, times(1)).convertToResponse(notificationRequest, Notification.class);
        verify(notificationClientService, times(1)).sendNotification(notification, true);
    }

    @Test
    public void sendTweetMentionNotification() {
        NotificationRequest notificationRequest = getMockNotificationRequest();
        Notification notification = getMockNotification();
        when(basicMapper.convertToResponse(notificationRequest, Notification.class)).thenReturn(notification);
        notificationClientMapper.sendTweetMentionNotification(notificationRequest);
        verify(basicMapper, times(1)).convertToResponse(notificationRequest, Notification.class);
        verify(notificationClientService, times(1)).sendTweetMentionNotification(notification);
    }

    @Test
    public void sendTweetNotificationToSubscribers() {
        notificationClientMapper.sendTweetNotificationToSubscribers(11L);
        verify(notificationClientService, times(1)).sendTweetNotificationToSubscribers(11L);
    }

    private NotificationRequest getMockNotificationRequest() {
        return NotificationRequest.builder()
                .notificationType(NotificationType.LIKE)
                .notificationCondition(true)
                .notifiedUserId(1L)
                .userId(USER_ID)
                .tweetId(45L)
                .build();
    }

    private Notification getMockNotification() {
        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.LIKE);
        notification.setNotifiedUserId(1L);
        notification.setUserId(USER_ID);
        notification.setTweetId(45L);
        return notification;
    }
}
