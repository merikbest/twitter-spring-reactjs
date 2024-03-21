package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.ChatTweetProjection;
import com.gmail.merikbest2015.repository.projection.NotificationTweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.impl.TweetClientServiceImpl;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class TweetClientServiceImplTest extends AbstractAuthTest {

    @Autowired
    private TweetClientServiceImpl tweetClientService;

    @MockBean
    private TweetRepository tweetRepository;

    private static final IdsRequest idsRequest = new IdsRequest(ids);
    private static final List<TweetProjection> tweetProjections = Arrays.asList(
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class),
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class));
    private static final Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getTweetsByIds() {
        when(tweetRepository.getTweetListsByIds(ids)).thenReturn(tweetProjections);
        assertEquals(tweetProjections, tweetClientService.getTweetsByIds(idsRequest));
        verify(tweetRepository, times(1)).getTweetListsByIds(ids);
    }

    @Test
    public void getTweetsByUserIds() {
        when(tweetRepository.getTweetsByAuthorIds(ids, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetClientService.getTweetsByUserIds(idsRequest, pageable));
        verify(tweetRepository, times(1)).getTweetsByAuthorIds(ids, pageable);
    }

    @Test
    public void getTweetById() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetClientService.getTweetById(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void getNotificationTweet() {
        NotificationTweetProjection notificationTweetProjection = TweetServiceTestHelper.createNotificationTweetProjection();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, NotificationTweetProjection.class))
                .thenReturn(Optional.of(notificationTweetProjection));
        assertEquals(notificationTweetProjection, tweetClientService.getNotificationTweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, NotificationTweetProjection.class);
    }

    @Test
    public void isTweetExists() {
        when(tweetRepository.isTweetExists(TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(tweetClientService.isTweetExists(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).isTweetExists(TestConstants.TWEET_ID);
    }

    @Test
    public void getTweetCountByText() {
        when(tweetRepository.getTweetCountByText("test text")).thenReturn(123L);
        assertEquals(123L, tweetClientService.getTweetCountByText("test text"));
        verify(tweetRepository, times(1)).getTweetCountByText("test text");
    }

    @Test
    public void getChatTweet() {
        ChatTweetProjection chatTweetProjection = TweetServiceTestHelper.createChatTweetProjection();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, ChatTweetProjection.class))
                .thenReturn(Optional.of(chatTweetProjection));
        assertEquals(chatTweetProjection, tweetClientService.getChatTweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, ChatTweetProjection.class);
    }
}
