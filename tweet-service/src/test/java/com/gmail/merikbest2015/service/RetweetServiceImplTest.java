package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.RetweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.service.impl.RetweetServiceImpl;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
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
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class RetweetServiceImplTest {

    @Autowired
    private RetweetServiceImpl retweetService;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private TweetServiceHelper tweetServiceHelper;

    @MockBean
    private RetweetRepository retweetRepository;

    @MockBean
    private UserClient userClient;

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();
    private static final PageRequest pageable = PageRequest.of(0, 20);

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getUserRetweetsAndReplies() {
        Page<TweetUserProjection> pageableTweetUserProjections =
                new PageImpl<>(createMockTweetUserProjectionList(), pageable, 20);
        List<TweetUserProjection> tweetUserProjections = Arrays.asList(
                TweetServiceTestHelper.createTweetProjection(TweetUserProjection.class),
                TweetServiceTestHelper.createTweetProjection(TweetUserProjection.class));
        List<RetweetProjection> retweetProjections = createMockRetweetProjectionList();
        int totalPages = tweetUserProjections.size() + retweetProjections.size();
        when(userClient.isUserExists(1L)).thenReturn(true);
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(false);
        when(tweetRepository.getRepliesByUserId(1L)).thenReturn(tweetUserProjections);
        when(retweetRepository.getRetweetsByUserId(1L)).thenReturn(retweetProjections);
        when(tweetServiceHelper.combineTweetsArrays(tweetUserProjections, retweetProjections))
                .thenReturn(tweetUserProjections);
        when(tweetServiceHelper.getPageableTweetProjectionList(pageable, tweetUserProjections, totalPages))
                .thenReturn(pageableTweetUserProjections);
        assertEquals(pageableTweetUserProjections, retweetService.getUserRetweetsAndReplies(1L, pageable));
        verify(userClient, times(1)).isUserExists(1L);
        verify(userClient, times(1)).isUserHavePrivateProfile(1L);
        verify(userClient, times(1)).isMyProfileBlockedByUser(1L);
        verify(tweetRepository, times(1)).getRepliesByUserId(1L);
        verify(retweetRepository, times(1)).getRetweetsByUserId(1L);
        verify(tweetServiceHelper, times(1)).combineTweetsArrays(tweetUserProjections, retweetProjections);
        verify(tweetServiceHelper, times(1)).getPageableTweetProjectionList(pageable, tweetUserProjections, totalPages);
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserIdNotFound() {
        when(userClient.isUserExists(1L)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(String.format(USER_ID_NOT_FOUND, 1L), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserNotFound() {
        when(userClient.isUserExists(1L)).thenReturn(true);
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserProfileBlocked() {
        when(userClient.isUserExists(1L)).thenReturn(true);
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    private static List<RetweetProjection> createMockRetweetProjectionList() {
        RetweetProjection retweetProjection1 = factory.createProjection(
                RetweetProjection.class,
                Map.of(
                        "id", 1L,
                        "retweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(TweetUserProjection.class)
                ));
        RetweetProjection retweetProjection2 = factory.createProjection(
                RetweetProjection.class,
                Map.of(
                        "id", 2L,
                        "retweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(TweetUserProjection.class)
                ));
        return Arrays.asList(retweetProjection1, retweetProjection2);
    }

    private static List<TweetUserProjection> createMockTweetUserProjectionList() {
        return Arrays.asList(
                TweetServiceTestHelper.createTweetProjection(TweetUserProjection.class),
                TweetServiceTestHelper.createTweetProjection(TweetUserProjection.class));
    }
}
