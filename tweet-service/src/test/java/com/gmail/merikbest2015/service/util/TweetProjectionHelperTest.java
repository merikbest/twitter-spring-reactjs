package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.repository.BookmarkRepository;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TweetProjectionHelperTest extends AbstractAuthTest {

    @Autowired
    private TweetProjectionHelper tweetProjectionHelper;

    @MockBean
    private LikeTweetRepository likeTweetRepository;

    @MockBean
    private RetweetRepository retweetRepository;

    @MockBean
    private BookmarkRepository bookmarkRepository;

    @MockBean
    private ListsClient listsClient;

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
        TweetListResponse tweetListResponse = new TweetListResponse();
        when(listsClient.getTweetList(TestConstants.LIST_ID)).thenReturn(tweetListResponse);
        assertNull(tweetProjectionHelper.getTweetList(TestConstants.LIST_ID));
        verify(listsClient, times(1)).getTweetList(TestConstants.LIST_ID);
    }
}
