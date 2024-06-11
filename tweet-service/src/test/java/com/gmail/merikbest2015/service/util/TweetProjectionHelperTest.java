package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TweetProjectionHelperTest extends AbstractServiceTest {

    @Autowired
    private TweetProjectionHelper tweetProjectionHelper;

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void isUserLikedTweet() {
        when(likeTweetRepository.isUserLikedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(tweetProjectionHelper.isUserLikedTweet(TestConstants.TWEET_ID));
        verify(likeTweetRepository, times(1)).isUserLikedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void isUserRetweetedTweet() {
        when(retweetRepository.isUserRetweetedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(tweetProjectionHelper.isUserRetweetedTweet(TestConstants.TWEET_ID));
        verify(retweetRepository, times(1)).isUserRetweetedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void isUserBookmarkedTweet() {
        when(bookmarkRepository.isUserBookmarkedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(tweetProjectionHelper.isUserBookmarkedTweet(TestConstants.TWEET_ID));
        verify(bookmarkRepository, times(1)).isUserBookmarkedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void getTweetList() {
        TweetListResponse tweetListResponse = new TweetListResponse();
        tweetListResponse.setId(TestConstants.TWEET_ID);
        when(listsClient.getTweetList(TestConstants.LIST_ID)).thenReturn(tweetListResponse);
        assertEquals(tweetListResponse, tweetProjectionHelper.getTweetList(TestConstants.LIST_ID));
        verify(listsClient, times(1)).getTweetList(TestConstants.LIST_ID);
    }

    @Test
    public void getTweetList_ShouldReturnNull() {
        when(listsClient.getTweetList(TestConstants.LIST_ID)).thenReturn(null);
        assertNull(tweetProjectionHelper.getTweetList(TestConstants.LIST_ID));
        verify(listsClient, times(1)).getTweetList(TestConstants.LIST_ID);
    }
}
