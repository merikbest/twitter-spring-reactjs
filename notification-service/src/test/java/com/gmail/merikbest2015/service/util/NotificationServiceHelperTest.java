package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.commons.dto.response.user.UserResponse;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class NotificationServiceHelperTest extends AbstractServiceTest {

    @Autowired
    private NotificationServiceHelper notificationServiceHelper;

    @Test
    public void getUserById() {
        when(userClient.getUserById(TestConstants.USER_ID)).thenReturn(new UserResponse());
        assertNotNull(notificationServiceHelper.getUserById(TestConstants.USER_ID));
        verify(userClient, times(1)).getUserById(TestConstants.USER_ID);
    }

    @Test
    public void getTweetById() {
        when(tweetClient.getTweetById(11L)).thenReturn(new TweetResponse());
        assertNotNull(notificationServiceHelper.getTweetById(11L));
        verify(tweetClient, times(1)).getTweetById(11L);
    }
}
