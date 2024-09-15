package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.impl.ScheduledTweetServiceImpl;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.commons.constants.ErrorMessage.INCORRECT_TWEET_TEXT_LENGTH;
import static com.gmail.merikbest2015.commons.constants.ErrorMessage.TWEET_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ScheduledTweetServiceImplTest extends AbstractServiceTest {

    @Autowired
    private ScheduledTweetServiceImpl scheduledTweetService;

    private final static TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
    private static Tweet tweet;

    @Before
    public void setUp() {
        super.setUp();
        tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test text");
        User authUser = new User();
        authUser.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(authUser));
    }

    @Test
    public void getScheduledTweets() {
        List<TweetProjection> tweetProjections = Arrays.asList(tweetProjection, tweetProjection);
        Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);
        when(tweetRepository.getScheduledTweets(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, scheduledTweetService.getScheduledTweets(pageable));
        verify(tweetRepository, times(1)).getScheduledTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void createScheduledTweet() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, scheduledTweetService.createScheduledTweet(tweet));
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void createScheduledTweet_ShouldIncorrectTweetLength() {
        tweet.setText("");
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> scheduledTweetService.createScheduledTweet(tweet));
        assertEquals(INCORRECT_TWEET_TEXT_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void updateScheduledTweet() {
        tweet.setId(TestConstants.TWEET_ID);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, scheduledTweetService.updateScheduledTweet(tweet));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void updateScheduledTweet_ShouldTweetNotFound() {
        tweet.setId(TestConstants.TWEET_ID);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> scheduledTweetService.updateScheduledTweet(tweet));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void updateScheduledTweet_ShouldIncorrectTweetLength() {
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("");
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> scheduledTweetService.updateScheduledTweet(tweet));
        assertEquals(INCORRECT_TWEET_TEXT_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void deleteScheduledTweets() {
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        assertEquals("Scheduled tweets deleted.", scheduledTweetService.deleteScheduledTweets(List.of(TestConstants.TWEET_ID)));
        assertTrue(tweet.isDeleted());
    }
}
