package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.service.LikeTweetService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class LikeTweetMapperTest {

    @Autowired
    private LikeTweetMapper likeTweetMapper;

    @MockBean
    private LikeTweetService likeTweetService;

    private final Pageable pageable = PageRequest.of(0, 20);

    @Test
    public void getLikedUsersByTweetId() {
        HeaderResponse<UserResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserResponse(), new UserResponse()), new HttpHeaders());
        when(likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable)).thenReturn(headerResponse);
        assertEquals(headerResponse, likeTweetMapper.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        verify(likeTweetService, times(1)).getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable);
    }

    @Test
    public void likeTweet() {
        NotificationResponse notificationResponse = new NotificationResponse();
        when(likeTweetService.likeTweet(TestConstants.TWEET_ID)).thenReturn(notificationResponse);
        assertEquals(notificationResponse, likeTweetMapper.likeTweet(TestConstants.TWEET_ID));
        verify(likeTweetService, times(1)).likeTweet(TestConstants.TWEET_ID);
    }
}
