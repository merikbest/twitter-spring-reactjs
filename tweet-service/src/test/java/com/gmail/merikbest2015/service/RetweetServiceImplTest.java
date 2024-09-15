package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.impl.RetweetServiceImpl;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.commons.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class RetweetServiceImplTest extends AbstractServiceTest {

    @Autowired
    private RetweetServiceImpl retweetService;

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
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(authUser));
    }

    @Test
    public void getUserRetweetsAndReplies() {
        List<TweetUserProjection> tweetUserProjections = TweetServiceTestHelper.createMockTweetUserProjectionList();
        Page<TweetUserProjection> pageableTweetUserProjections = new PageImpl<>(tweetUserProjections, pageable, 20);
        when(userRepository.findById(1L)).thenReturn(Optional.of(authUser));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(false);
        when(tweetRepository.getRetweetsAndRepliesByUserId(1L, pageable)).thenReturn(pageableTweetUserProjections);
        Page<TweetUserProjection> userRetweetsAndReplies = retweetService.getUserRetweetsAndReplies(1L, pageable);
        assertEquals(2, userRetweetsAndReplies.getContent().size());
        verify(tweetRepository, times(1)).getRetweetsAndRepliesByUserId(1L, pageable);
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserIdNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(String.format(USER_ID_NOT_FOUND, 1L), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(authUser));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserRetweetsAndReplies_ShouldUserProfileBlocked() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(authUser));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getUserRetweetsAndReplies(1L, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRetweetedUsersByTweetId() {
        Page<UserProjection> userProjections = TweetServiceTestHelper.createUserProjections();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.getRetweetedUsersByTweet(tweet, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(userRepository, times(1)).getRetweetedUsersByTweet(tweet, pageable);
    }

    @Test
    public void getRetweetedUsersByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRetweetedUsersByTweetId_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
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
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
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
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.getRetweetedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void retweet_ShouldUnRetweet() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetRetweeted(authUser, tweet)).thenReturn(Optional.of(new Tweet()));
        retweetService.retweet(TestConstants.TWEET_ID);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).updateRetweetsCount(false, tweet);
        verify(tweetRepository, times(1)).delete(any());
        verify(tweetNotificationProducer, times(1)).sendTweetNotificationEvent(NotificationType.RETWEET, tweet, authUser, false);
    }

    @Test
    public void retweet_ShouldRetweet() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetRetweeted(authUser, tweet)).thenReturn(Optional.empty());
        retweetService.retweet(TestConstants.TWEET_ID);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).updateRetweetsCount(true, tweet);
        verify(tweetNotificationProducer, times(1)).sendTweetNotificationEvent(NotificationType.RETWEET, tweet, authUser, true);
    }

    @Test
    public void retweet_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.retweet(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void retweet_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
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
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
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
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> retweetService.retweet(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
