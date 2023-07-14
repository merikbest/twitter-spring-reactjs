package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class NotificationServiceHelperTest {

    @Autowired
    private NotificationServiceHelper notificationServiceHelper;

    @MockBean
    private UserClient userClient;

    @MockBean
    private TweetClient tweetClient;

    @MockBean
    private ListsClient listsClient;

    @Test
    public void getUserById() {
        when(userClient.getUserById(USER_ID)).thenReturn(new UserResponse());
        assertNotNull(notificationServiceHelper.getUserById(USER_ID));
        verify(userClient, times(1)).getUserById(USER_ID);
    }

    @Test
    public void getTweetById() {
        when(tweetClient.getTweetById(11L)).thenReturn(new TweetResponse());
        assertNotNull(notificationServiceHelper.getTweetById(11L));
        verify(tweetClient, times(1)).getTweetById(11L);
    }

    @Test
    public void getNotificationUser() {
        when(userClient.getNotificationUser(USER_ID)).thenReturn(new NotificationUserResponse());
        assertNotNull(notificationServiceHelper.getNotificationUser(USER_ID));
        verify(userClient, times(1)).getNotificationUser(USER_ID);
    }

    @Test
    public void getNotificationTweet() {
        when(tweetClient.getNotificationTweet(USER_ID)).thenReturn(new NotificationTweetResponse());
        assertNotNull(notificationServiceHelper.getNotificationTweet(USER_ID));
        verify(tweetClient, times(1)).getNotificationTweet(USER_ID);
    }

    @Test
    public void getNotificationList() {
        when(listsClient.getNotificationList(3L)).thenReturn(new NotificationListResponse());
        assertNotNull(notificationServiceHelper.getNotificationList(3L));
        verify(listsClient, times(1)).getNotificationList(3L);
    }
}
