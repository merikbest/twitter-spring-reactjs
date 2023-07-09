package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

    private final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    @Test
    public void getUserNotifications() {
        Map<String, Object> notificationMap = new HashMap<>();
        notificationMap.put("id", 1L);
        notificationMap.put("date", LocalDateTime.now());
        notificationMap.put("notificationType", NotificationType.TWEET);
        notificationMap.put("userId", 1L);
        notificationMap.put("userToFollowId", 2L);
        notificationMap.put("tweetId", 3L);
        notificationMap.put("listId", 4L);
        notificationMap.put("user", new NotificationUserResponse());
        notificationMap.put("userToFollow", new NotificationUserResponse());
        notificationMap.put("tweet", new NotificationTweetResponse());
        notificationMap.put("list", new NotificationListResponse());
        NotificationProjection notification1 = factory.createProjection(NotificationProjection.class, notificationMap);
        NotificationProjection notification2 = factory.createProjection(NotificationProjection.class, notificationMap);
        Pageable pageable = PageRequest.of(0, 20);
        Page<NotificationProjection> notifications = new PageImpl<>(Arrays.asList(notification1, notification2), pageable, 20);
        when(notificationRepository.getNotificationsByUserId(1L, pageable)).thenReturn(notifications);
        TestUtil.mockAuthenticatedUserId();
        Page<NotificationProjection> userNotifications = notificationService.getUserNotifications(pageable);
        assertEquals(2, userNotifications.getContent().size());
        verify(userClient, times(1)).resetNotificationCount();
        verify(notificationRepository, times(1)).getNotificationsByUserId(1L, pageable);
    }

    @Test
    public void getUserMentionsNotifications() {
        Pageable pageable = PageRequest.of(0, 20);
        List<Long> tweetIds = Arrays.asList(1L, 2L, 3L);
        when(notificationRepository.getTweetNotificationMentionIds(1L, pageable))
                .thenReturn(new PageImpl<>(tweetIds, pageable, 20));
        when(tweetClient.getTweetsByIds(new IdsRequest(tweetIds)))
                .thenReturn(Arrays.asList(new TweetResponse(), new TweetResponse(), new TweetResponse()));
        TestUtil.mockAuthenticatedUserId();
        Page<TweetResponse> userMentionsNotifications = notificationService.getUserMentionsNotifications(pageable);
        assertEquals(3, userMentionsNotifications.getContent().size());
        verify(userClient, times(1)).resetMentionCount();
        verify(notificationRepository, times(1)).getTweetNotificationMentionIds(1L, pageable);
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
}
