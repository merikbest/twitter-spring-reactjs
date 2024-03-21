package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Retweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.RetweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.impl.RetweetServiceImpl;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class RetweetServiceImplTest extends AbstractAuthTest {

    @Autowired
    private RetweetServiceImpl retweetService;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private TweetServiceHelper tweetServiceHelper;

    @MockBean
    private RetweetRepository retweetRepository;

    @MockBean
    private UserService userService;

    private static Tweet tweet;
    private static User authUser;

    @Before
    public void setUp() {
        super.setUp();
        tweet = new Tweet();
        tweet.setDeleted(false);
        authUser = new User();
        authUser.setId(TestConstants.USER_ID);
        tweet.setAuthor(authUser);
    }

    @Test
    public void getUserRetweetsAndReplies() {
        List<TweetUserProjection> tweetUserProjections = TweetServiceTestHelper.createMockTweetUserProjectionList();
        List<RetweetProjection> retweetProjections = TweetServiceTestHelper.createMockRetweetProjectionList();
        Page<TweetUserProjection> pageableTweetUserProjections = new PageImpl<>(tweetUserProjections, pageable, 20);
        int totalPages = tweetUserProjections.size() + retweetProjections.size();
        when(userService.getUserById(1L)).thenReturn(Optional.of(authUser));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(1L)).thenReturn(false);
        when(tweetRepository.getRepliesByUserId(1L)).thenReturn(tweetUserProjections);
        when(retweetRepository.getRetweetsByUserId(1L)).thenReturn(retweetProjections);
        when(tweetServiceHelper.combineTweetsArrays(tweetUserProjections, retweetProjections))
                .thenReturn(tweetUserProjections);
        when(tweetServiceHelper.getPageableTweetProjectionList(pageable, tweetUserProjections, totalPages))
                .thenReturn(pageableTweetUserProjections);
        assertEquals(pageableTweetUserProjections, retweetService.getUserRetweetsAndReplies(1L, pageable));
        verify(userService, times(1)).getUserById(1L);
        verify(userService, times(1)).isUserHavePrivateProfile(1L);
        verify(userService, times(1)).isMyProfileBlockedByUser(1L);
        verify(tweetRepository, times(1)).getRepliesByUserId(1L);
        verify(retweetRepository, times(1)).getRetweetsByUserId(1L);
        verify(tweetServiceHelper, times(1)).combineTweetsArrays(tweetUserProjections, retweetProjections);
        verify(tweetServiceHelper, times(1)).getPageableTweetProjectionList(pageable, tweetUserProjections, totalPages);
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserIdNotFound() {
        when(userService.getUserById(1L)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(String.format(USER_ID_NOT_FOUND, 1L), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserNotFound() {
        when(userService.getUserById(1L)).thenReturn(Optional.of(authUser));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserProfileBlocked() {
        when(userService.getUserById(1L)).thenReturn(Optional.of(authUser));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRetweetedUsersByTweetId() {
        Page<UserProjection> userProjections = TweetServiceTestHelper.createUserProjections();
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.getRetweetedUsersByTweet(tweet, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(userService, times(1)).getRetweetedUsersByTweet(tweet, pageable);
    }

    @Test
    public void getRetweetedUsersByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRetweetedUsersByTweetId_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRetweetedUsersByTweetId_ShouldUserNotFound() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRetweetedUsersByTweetId_ShouldUserProfileBlocked() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void retweet_ShouldUnRetweet() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.getAuthUser()).thenReturn(authUser);
        when(retweetRepository.isTweetRetweeted(authUser, tweet)).thenReturn(new Retweet());
        when(tweetServiceHelper
                .sendNotification(NotificationType.RETWEET, false, TestConstants.USER_ID, TestConstants.USER_ID, TestConstants.TWEET_ID))
                .thenReturn(new NotificationResponse());
        assertEquals(new NotificationResponse(), retweetService.retweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(retweetRepository, times(1)).isTweetRetweeted(authUser, tweet);
        verify(retweetRepository, times(1)).delete(any());
        verify(userService, times(1)).getAuthUser();
        verify(tweetServiceHelper, times(1))
                .sendNotification(NotificationType.RETWEET, false, TestConstants.USER_ID, TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void retweet_ShouldRetweet() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.getAuthUser()).thenReturn(authUser);
        when(retweetRepository.isTweetRetweeted(authUser, tweet)).thenReturn(null);
        when(tweetServiceHelper
                .sendNotification(NotificationType.RETWEET, true, TestConstants.USER_ID, TestConstants.USER_ID, TestConstants.TWEET_ID))
                .thenReturn(new NotificationResponse());
        assertEquals(new NotificationResponse(), retweetService.retweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(retweetRepository, times(1)).isTweetRetweeted(authUser, tweet);
        verify(retweetRepository, times(1)).save(any());
        verify(userService, times(1)).getAuthUser();
        verify(tweetServiceHelper, times(1))
                .sendNotification(NotificationType.RETWEET, true, TestConstants.USER_ID, TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void retweet_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.retweet(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void retweet_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.retweet(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void retweet_ShouldUserNotFound() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.retweet(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void retweet_ShouldUserProfileBlocked() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.retweet(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
