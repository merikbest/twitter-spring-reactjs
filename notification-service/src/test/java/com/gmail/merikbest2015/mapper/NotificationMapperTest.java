package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.NotificationTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.NotificationInfoResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.repository.projection.NotificationInfoProjection;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import com.gmail.merikbest2015.service.NotificationService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class NotificationMapperTest {

    @Autowired
    private NotificationMapper notificationMapper;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private NotificationService notificationService;

    private final Pageable pageable = PageRequest.of(0, 20);

    @Test
    public void getUserNotifications() {
        Page<NotificationProjection> notifications = new PageImpl<>(
                NotificationTestHelper.getMockNotificationProjectionList(), pageable, 20);
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setId(1L);
        notificationResponse.setDate(LocalDateTime.now());
        notificationResponse.setNotificationType(NotificationType.TWEET);
        notificationResponse.setUser(new NotificationUserResponse());
        notificationResponse.setNotifiedUserId(1L);
        notificationResponse.setUserToFollow(new NotificationUserResponse());
        notificationResponse.setTweet(new NotificationTweetResponse());
        notificationResponse.setList(new NotificationListResponse());
        HeaderResponse<NotificationResponse> headerResponse = new HeaderResponse<>(
                Arrays.asList(notificationResponse, notificationResponse), new HttpHeaders());
        when(notificationService.getUserNotifications(pageable)).thenReturn(notifications);
        when(basicMapper.getHeaderResponse(notifications, NotificationResponse.class)).thenReturn(headerResponse);
        HeaderResponse<NotificationResponse> userNotifications = notificationMapper.getUserNotifications(pageable);
        assertEquals(2, userNotifications.getItems().size());
        verify(notificationService, times(1)).getUserNotifications(pageable);
        verify(basicMapper, times(1)).getHeaderResponse(notifications, NotificationResponse.class);
    }

    @Test
    public void getUserMentionsNotifications() {
        Page<TweetResponse> tweets = new PageImpl<>(Arrays.asList(new TweetResponse(), new TweetResponse()), pageable, 20);
        HeaderResponse<TweetResponse> headerResponse = new HeaderResponse<>(tweets.getContent(), new HttpHeaders());
        when(notificationService.getUserMentionsNotifications(pageable)).thenReturn(tweets);
        when(basicMapper.getHeaderResponse(tweets, TweetResponse.class)).thenReturn(headerResponse);
        HeaderResponse<TweetResponse> userNotifications = notificationMapper.getUserMentionsNotifications(pageable);
        assertEquals(2, userNotifications.getItems().size());
        verify(notificationService, times(1)).getUserMentionsNotifications(pageable);
        verify(basicMapper, times(1)).getHeaderResponse(tweets, TweetResponse.class);
    }

    @Test
    public void getTweetAuthorsNotifications() {
        when(notificationService.getTweetAuthorsNotifications())
                .thenReturn(Arrays.asList(new NotificationUserResponse(), new NotificationUserResponse()));
        assertEquals(2, notificationMapper.getTweetAuthorsNotifications().size());
        verify(notificationService, times(1)).getTweetAuthorsNotifications();
    }

    @Test
    public void getUserNotificationById() {
        NotificationInfoProjection infoProjection = NotificationTestHelper.getMockNotificationInfoProjection();
        when(notificationService.getUserNotificationById(1L)).thenReturn(infoProjection);
        when(basicMapper.convertToResponse(infoProjection, NotificationInfoResponse.class)).thenReturn(new NotificationInfoResponse());
        assertNotNull(notificationMapper.getUserNotificationById(1L));
        verify(notificationService, times(1)).getUserNotificationById(1L);
        verify(basicMapper, times(1)).convertToResponse(infoProjection, NotificationInfoResponse.class);
    }

    @Test
    public void getNotificationsFromTweetAuthors() {
        Page<TweetResponse> tweets = new PageImpl<>(Arrays.asList(new TweetResponse(), new TweetResponse()), pageable, 20);
        HeaderResponse<TweetResponse> headerResponse = new HeaderResponse<>(tweets.getContent(), new HttpHeaders());
        when(notificationService.getNotificationsFromTweetAuthors(pageable)).thenReturn(tweets);
        when(basicMapper.getHeaderResponse(tweets, TweetResponse.class)).thenReturn(headerResponse);
        HeaderResponse<TweetResponse> userNotifications = notificationMapper.getNotificationsFromTweetAuthors(pageable);
        assertEquals(2, userNotifications.getItems().size());
        verify(notificationService, times(1)).getNotificationsFromTweetAuthors(pageable);
        verify(basicMapper, times(1)).getHeaderResponse(tweets, TweetResponse.class);
    }
}
