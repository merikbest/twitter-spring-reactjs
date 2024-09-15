package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.commons.event.TweetNotificationEvent;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Notification;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class NotificationHandlerMapperTest {

    @InjectMocks
    private NotificationHandlerMapper notificationHandlerMapper;

    @Mock
    private BasicMapper basicMapper;

    @Test
    public void convertToNotificationListResponse() {
        Notification notification = new Notification();
        NotificationResponse notificationResponse = new NotificationResponse();
        when(basicMapper.convertToResponse(notification, NotificationResponse.class)).thenReturn(notificationResponse);
        assertEquals(notificationResponse, notificationHandlerMapper.convertToNotificationListResponse(notification, true));
        verify(basicMapper, times(1)).convertToResponse(notification, NotificationResponse.class);
    }

    @Test
    public void convertToNotificationUserResponse() {
        Notification notification = new Notification();
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setUserToFollow(Mockito.mock(NotificationUserResponse.class));
        when(basicMapper.convertToResponse(notification, NotificationResponse.class)).thenReturn(notificationResponse);
        assertEquals(notificationResponse, notificationHandlerMapper.convertToNotificationUserResponse(notification, true));
        verify(basicMapper, times(1)).convertToResponse(notification, NotificationResponse.class);
    }

    @Test
    public void convertToNotificationTweetResponse() {
        Notification notification = new Notification();
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setTweet(Mockito.mock(NotificationTweetResponse.class));
        when(basicMapper.convertToResponse(notification, NotificationResponse.class)).thenReturn(notificationResponse);
        assertEquals(notificationResponse, notificationHandlerMapper.convertToNotificationTweetResponse(notification, true));
        verify(basicMapper, times(1)).convertToResponse(notification, NotificationResponse.class);
    }

    @Test
    public void convertToNotificationTweetResponse_withTweetNotificationEvent() {
        TweetNotificationEvent event = new TweetNotificationEvent();
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setTweet(Mockito.mock(NotificationTweetResponse.class));
        when(basicMapper.convertToResponse(event, NotificationResponse.class)).thenReturn(notificationResponse);
        assertEquals(notificationResponse, notificationHandlerMapper.convertToNotificationTweetResponse(event));
        verify(basicMapper, times(1)).convertToResponse(event, NotificationResponse.class);
    }
}
