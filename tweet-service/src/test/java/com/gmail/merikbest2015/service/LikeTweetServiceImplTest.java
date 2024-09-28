package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.commons.constants.ErrorMessage;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.TweetErrorMessage;
import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.impl.LikeTweetServiceImpl;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class LikeTweetServiceImplTest extends AbstractServiceTest {

    @Autowired
    private LikeTweetServiceImpl likeTweetService;

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();
    private static Tweet tweet;
    private static User authUser;

    @Before
    public void setUp() {
        super.setUp();
        tweet = new Tweet();
        tweet.setDeleted(false);
        authUser = new User();
        authUser.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(authUser));
        tweet.setAuthor(authUser);
    }

    @Test
    public void getUserLikedTweets() {
        Page<LikeTweetProjection> likeTweet = new PageImpl<>(createMockLikeTweetProjectionList(), pageable, 20);
        when(likeTweetRepository.getUserLikedTweets(TestConstants.USER_ID, pageable)).thenReturn(likeTweet);
        assertEquals(likeTweet, likeTweetService.getUserLikedTweets(TestConstants.USER_ID, pageable));
        verify(likeTweetRepository, times(1)).getUserLikedTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getUserLikedTweets_ShouldUserIdNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getUserLikedTweets(TestConstants.USER_ID, pageable));
        assertEquals(String.format(ErrorMessage.USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserLikedTweets_ShouldUserNotFound() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(userRepository.findById(1L)).thenReturn(Optional.of(authUser));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getUserLikedTweets(1L, pageable));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserLikedTweets_ShouldUserProfileBLocked() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(userRepository.findById(1L)).thenReturn(Optional.of(authUser));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getUserLikedTweets(1L, pageable));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getLikedUsersByTweetId() {
        Page<UserProjection> userProjections = TweetServiceTestHelper.createUserProjections();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.getLikedUsersByTweet(tweet, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(userRepository, times(1)).getLikedUsersByTweet(tweet, pageable);
    }

    @Test
    public void getLikedUsersByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getLikedUsersByTweetId_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getLikedUsersByTweetId_ShouldUserNotFound() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getLikedUsersByTweetId_ShouldUserProfileBlocked() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.getLikedUsersByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void likeTweet_ShouldUnlikeTweet() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(likeTweetRepository.getLikedTweet(authUser, tweet)).thenReturn(new LikeTweet());
        assertEquals(tweet, likeTweetService.likeTweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).updateLikesCount(false, tweet);
        verify(likeTweetRepository, times(1)).getLikedTweet(authUser, tweet);
        verify(likeTweetRepository, times(1)).delete(any());
        verify(tweetNotificationProducer, times(1)).sendTweetNotificationEvent(NotificationType.LIKE, tweet, authUser, false);
    }

    @Test
    public void likeTweet_ShouldLikeTweet() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(likeTweetRepository.getLikedTweet(authUser, tweet)).thenReturn(null);
        assertEquals(tweet, likeTweetService.likeTweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).updateLikesCount(true, tweet);
        verify(likeTweetRepository, times(1)).getLikedTweet(authUser, tweet);
        verify(likeTweetRepository, times(1)).save(any());
        verify(tweetNotificationProducer, times(1)).sendTweetNotificationEvent(NotificationType.LIKE, tweet, authUser, true);
    }

    @Test
    public void likeTweet_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.likeTweet(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void likeTweet_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.likeTweet(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void likeTweet_ShouldUserNotFound() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.likeTweet(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void likeTweet_ShouldUserProfileBlocked() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> likeTweetService.likeTweet(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    private static List<LikeTweetProjection> createMockLikeTweetProjectionList() {
        LikeTweetProjection likeTweetProjection1 = factory.createProjection(
                LikeTweetProjection.class,
                Map.of(
                        "id", 1L,
                        "likeTweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class)
                ));
        LikeTweetProjection likeTweetProjection2 = factory.createProjection(
                LikeTweetProjection.class,
                Map.of(
                        "id", 2L,
                        "likeTweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class)
                ));
        return Arrays.asList(likeTweetProjection1, likeTweetProjection2);
    }
}
