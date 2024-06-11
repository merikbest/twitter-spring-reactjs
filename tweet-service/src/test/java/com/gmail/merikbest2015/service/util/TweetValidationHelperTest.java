package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class TweetValidationHelperTest extends AbstractServiceTest {

    @Autowired
    private TweetValidationHelper tweetValidationHelper;

    private static Tweet tweet;

    @Before
    public void setUp() {
        super.setUp();
        tweet = new Tweet();
        User authUser = new User();
        authUser.setId(TestConstants.USER_ID);
        tweet.setAuthor(authUser);
    }

    @Test
    public void checkValidTweet() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        assertEquals(tweet, tweetValidationHelper.checkValidTweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
    }

    @Test
    public void checkValidTweet_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetValidationHelper.checkValidTweet(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkValidTweet_ShouldTweetDeleted() {
        User authUser = new User();
        authUser.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setDeleted(true);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetValidationHelper.checkValidTweet(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void checkValidTweet_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetValidationHelper.checkValidTweet(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkValidTweet_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetValidationHelper.checkValidTweet(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void validateUserProfile_ShouldUserNotFound() {
        when(userRepository.isUserExists(TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetValidationHelper.validateUserProfile(TestConstants.USER_ID));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkTweetTextLength() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetValidationHelper.checkTweetTextLength(""));
        assertEquals(INCORRECT_TWEET_TEXT_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
