package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.NotificationTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import com.gmail.merikbest2015.service.NotificationService;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.NOTIFICATION_NOT_FOUND;
import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class NotificationServiceImplTest {

    @Autowired
    private NotificationService notificationService;

    @MockBean
    private NotificationRepository notificationRepository;

    @MockBean
    private UserClient userClient;

    @MockBean
    private TweetClient tweetClient;

    private final Pageable pageable = PageRequest.of(0, 20);
    private final List<Long> tweetIds = Arrays.asList(1L, 2L, 3L);

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getUserNotifications() {
        Page<NotificationProjection> notifications = new PageImpl<>(
                NotificationTestHelper.getMockNotificationProjectionList(), pageable, 20);
        when(notificationRepository.getNotificationsByUserId(USER_ID, pageable)).thenReturn(notifications);
        Page<NotificationProjection> userNotifications = notificationService.getUserNotifications(pageable);
        assertEquals(2, userNotifications.getContent().size());
        verify(userClient, times(1)).resetNotificationCount();
        verify(notificationRepository, times(1)).getNotificationsByUserId(USER_ID, pageable);
    }

    @Test
    public void getUserMentionsNotifications() {
        when(notificationRepository.getTweetNotificationMentionIds(USER_ID, pageable))
                .thenReturn(new PageImpl<>(tweetIds, pageable, 20));
        when(tweetClient.getTweetsByIds(new IdsRequest(tweetIds)))
                .thenReturn(Arrays.asList(new TweetResponse(), new TweetResponse(), new TweetResponse()));
        Page<TweetResponse> userMentionsNotifications = notificationService.getUserMentionsNotifications(pageable);
        assertEquals(3, userMentionsNotifications.getContent().size());
        verify(userClient, times(1)).resetMentionCount();
        verify(notificationRepository, times(1)).getTweetNotificationMentionIds(USER_ID, pageable);
        verify(tweetClient, times(1)).getTweetsByIds(new IdsRequest(tweetIds));
    }

    @Test
    public void getTweetAuthorsNotifications() {
        when(userClient.getUsersWhichUserSubscribed())
                .thenReturn(Arrays.asList(new NotificationUserResponse(), new NotificationUserResponse()));
        List<NotificationUserResponse> notifications = notificationService.getTweetAuthorsNotifications();
        assertEquals(2, notifications.size());
        verify(userClient, times(1)).resetNotificationCount();
        verify(userClient, times(1)).getUsersWhichUserSubscribed();
    }

    @Test
    public void getUserNotificationById() {
        when(notificationRepository.getUserNotificationById(USER_ID, 1L))
                .thenReturn(Optional.of(NotificationTestHelper.getMockNotificationInfoProjection()));
        assertNotNull(notificationService.getUserNotificationById(1L));
        verify(notificationRepository, times(1)).getUserNotificationById(USER_ID, 1L);
    }

    @Test
    public void getUserNotificationById_shouldReturnNotificationNotFound() {
        when(notificationRepository.getUserNotificationById(USER_ID, 1L)).thenReturn(Optional.empty());
        try {
            notificationService.getUserNotificationById(1L);
        } catch (ApiRequestException exception) {
            assertEquals(NOTIFICATION_NOT_FOUND, exception.getMessage());
            assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        }
        verify(notificationRepository, times(1)).getUserNotificationById(USER_ID, 1L);
    }

    @Test
    public void getNotificationsFromTweetAuthors() {
        List<Long> userIds = Arrays.asList(4L, 5L, 6L);
        when(userClient.getUserIdsWhichUserSubscribed()).thenReturn(userIds);
        when(notificationRepository.getTweetIdsByNotificationType(userIds, USER_ID, pageable))
                .thenReturn(new PageImpl<>(tweetIds, pageable, 20));
        when(tweetClient.getTweetsByIds(new IdsRequest(tweetIds)))
                .thenReturn(Arrays.asList(new TweetResponse(), new TweetResponse(), new TweetResponse()));
        Page<TweetResponse> userMentionsNotifications = notificationService.getNotificationsFromTweetAuthors(pageable);
        assertEquals(3, userMentionsNotifications.getContent().size());
        verify(userClient, times(1)).getUserIdsWhichUserSubscribed();
        verify(notificationRepository, times(1)).getTweetIdsByNotificationType(userIds, USER_ID, pageable);
        verify(tweetClient, times(1)).getTweetsByIds(new IdsRequest(tweetIds));
    }
}
