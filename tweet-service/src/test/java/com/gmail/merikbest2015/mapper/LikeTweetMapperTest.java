package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.commons.dto.response.user.UserResponse;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.LikeTweetService;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class LikeTweetMapperTest {

    @InjectMocks
    private LikeTweetMapper likeTweetMapper;

    @Mock
    private BasicMapper basicMapper;

    @Mock
    private LikeTweetService likeTweetService;

    private static final PageRequest pageable = TweetServiceTestHelper.pageable;

    @Test
    public void getLikedUsersByTweetId() {
        HeaderResponse<UserResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserResponse(), new UserResponse()), new HttpHeaders());
        Page<UserProjection> userProjections = TweetServiceTestHelper.createUserProjections();
        when(likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable)).thenReturn(userProjections);
        when(basicMapper.getHeaderResponse(userProjections, UserResponse.class)).thenReturn(headerResponse);
        assertNotNull(likeTweetMapper.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        verify(likeTweetService, times(1)).getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable);
    }

    @Test
    public void likeTweet() {
        Tweet tweet = new Tweet();
        NotificationTweetResponse notificationResponse = new NotificationTweetResponse();
        when(likeTweetService.likeTweet(TestConstants.TWEET_ID)).thenReturn(tweet);
        when(basicMapper.convertToResponse(tweet, NotificationTweetResponse.class)).thenReturn(notificationResponse);
        assertEquals(notificationResponse, likeTweetMapper.likeTweet(TestConstants.TWEET_ID));
        verify(likeTweetService, times(1)).likeTweet(TestConstants.TWEET_ID);
    }
}
