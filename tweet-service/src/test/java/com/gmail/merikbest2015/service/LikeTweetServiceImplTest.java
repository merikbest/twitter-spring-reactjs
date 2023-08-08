package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.service.impl.LikeTweetServiceImpl;
import com.gmail.merikbest2015.util.TestConstants;
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
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class LikeTweetServiceImplTest {

    @Autowired
    private LikeTweetServiceImpl likeTweetService;

    @MockBean
    private LikeTweetRepository likeTweetRepository;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private NotificationClient notificationClient;

    @MockBean
    private UserClient userClient;

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();
    private static final PageRequest pageable = PageRequest.of(0, 20);
    private static Tweet tweet;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
        tweet = new Tweet();
        tweet.setDeleted(false);
        tweet.setAuthorId(TestConstants.USER_ID);
    }

    @Test
    public void getUserLikedTweets() {
        Page<LikeTweetProjection> likeTweet = new PageImpl<>(createMockLikeTweetProjectionList(), pageable, 20);
        when(userClient.isUserExists(TestConstants.USER_ID)).thenReturn(true);
        when(likeTweetRepository.getUserLikedTweets(TestConstants.USER_ID, pageable)).thenReturn(likeTweet);
        assertEquals(likeTweet, likeTweetService.getUserLikedTweets(TestConstants.USER_ID, pageable));
        verify(userClient, times(1)).isUserExists(TestConstants.USER_ID);
        verify(likeTweetRepository, times(1)).getUserLikedTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getUserLikedTweets_ShouldUserIdNotFound() {
        when(userClient.isUserExists(TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getUserLikedTweets(TestConstants.USER_ID, pageable));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserLikedTweets_ShouldUserNotFound() {
        tweet.setAuthorId(1L);
        when(userClient.isUserExists(1L)).thenReturn(true);
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getUserLikedTweets(1L, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserLikedTweets_ShouldUserProfileBLocked() {
        tweet.setAuthorId(1L);
        when(userClient.isUserExists(1L)).thenReturn(true);
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getUserLikedTweets(1L, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    private static List<LikeTweetProjection> createMockLikeTweetProjectionList() {
        LikeTweetProjection likeTweetProjection1 = factory.createProjection(
                LikeTweetProjection.class,
                Map.of(
                        "id", 1L,
                        "likeTweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection()
                ));
        LikeTweetProjection likeTweetProjection2 = factory.createProjection(
                LikeTweetProjection.class,
                Map.of(
                        "id", 2L,
                        "likeTweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection()
                ));
        return Arrays.asList(likeTweetProjection1, likeTweetProjection2);
    }

    private static NotificationRequest createMockNotificationRequest(boolean isTweetLiked) {
        return NotificationRequest.builder()
                .notificationType(NotificationType.LIKE)
                .notificationCondition(isTweetLiked)
                .notifiedUserId(TestConstants.USER_ID)
                .userId(TestConstants.USER_ID)
                .tweetId(TestConstants.TWEET_ID)
                .build();
    }
}
