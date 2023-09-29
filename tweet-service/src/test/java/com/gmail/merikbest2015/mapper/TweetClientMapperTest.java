package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.repository.projection.ChatTweetProjection;
import com.gmail.merikbest2015.repository.projection.NotificationTweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.TweetClientService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class TweetClientMapperTest extends AbstractAuthTest {

    @Autowired
    private TweetClientMapper tweetClientMapper;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private TweetClientService tweetClientService;

    private static final List<TweetProjection> tweetProjections = Arrays.asList(
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class),
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class));
    private static final Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);

    @Test
    public void getTweetsByIds() {
        List<TweetResponse> tweetResponses = List.of(new TweetResponse(), new TweetResponse());
        when(tweetClientService.getTweetsByIds(new IdsRequest())).thenReturn(tweetProjections);
        when(basicMapper.convertToResponseList(tweetProjections, TweetResponse.class)).thenReturn(tweetResponses);
        assertEquals(tweetResponses, tweetClientMapper.getTweetsByIds(new IdsRequest()));
        verify(tweetClientService, times(1)).getTweetsByIds(new IdsRequest());
        verify(basicMapper, times(1)).convertToResponseList(tweetProjections, TweetResponse.class);
    }

    @Test
    public void getTweetsByUserIds() {
        HeaderResponse<TweetResponse> headerResponse = new HeaderResponse<>(
                List.of(new TweetResponse(), new TweetResponse()), new HttpHeaders());
        when(tweetClientService.getTweetsByUserIds(new IdsRequest(), pageable)).thenReturn(pageableTweetProjections);
        when(basicMapper.getHeaderResponse(pageableTweetProjections, TweetResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, tweetClientMapper.getTweetsByUserIds(new IdsRequest(), pageable));
        verify(tweetClientService, times(1)).getTweetsByUserIds(new IdsRequest(), pageable);
        verify(basicMapper, times(1)).getHeaderResponse(pageableTweetProjections, TweetResponse.class);
    }

    @Test
    public void getTweetById() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetClientService.getTweetById(TestConstants.TWEET_ID)).thenReturn(tweetProjection);
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(new TweetResponse());
        assertEquals(new TweetResponse(), tweetClientMapper.getTweetById(TestConstants.TWEET_ID));
        verify(tweetClientService, times(1)).getTweetById(TestConstants.TWEET_ID);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
    }

    @Test
    public void getNotificationTweet() {
        NotificationTweetProjection notificationTweetProjection = TweetServiceTestHelper.createNotificationTweetProjection();
        when(tweetClientService.getNotificationTweet(TestConstants.TWEET_ID)).thenReturn(notificationTweetProjection);
        when(basicMapper.convertToResponse(notificationTweetProjection, NotificationTweetResponse.class))
                .thenReturn(new NotificationTweetResponse());
        assertEquals(new NotificationTweetResponse(), tweetClientMapper.getNotificationTweet(TestConstants.TWEET_ID));
        verify(tweetClientService, times(1)).getNotificationTweet(TestConstants.TWEET_ID);
        verify(basicMapper, times(1)).convertToResponse(notificationTweetProjection, NotificationTweetResponse.class);
    }

    @Test
    public void isTweetExists() {
        when(tweetClientService.isTweetExists(TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(tweetClientMapper.isTweetExists(TestConstants.TWEET_ID));
        verify(tweetClientService, times(1)).isTweetExists(TestConstants.TWEET_ID);
    }

    @Test
    public void getTweetCountByText() {
        when(tweetClientService.getTweetCountByText(TestConstants.TWEET_TEXT)).thenReturn(1L);
        assertEquals(1L, tweetClientMapper.getTweetCountByText(TestConstants.TWEET_TEXT));
        verify(tweetClientService, times(1)).getTweetCountByText(TestConstants.TWEET_TEXT);
    }

    @Test
    public void getChatTweet() {
        ChatTweetProjection chatTweetProjection = TweetServiceTestHelper.createChatTweetProjection();
        when(tweetClientService.getChatTweet(TestConstants.TWEET_ID)).thenReturn(chatTweetProjection);
        when(basicMapper.convertToResponse(chatTweetProjection, ChatTweetResponse.class)).thenReturn(new ChatTweetResponse());
        assertEquals(new ChatTweetResponse(), tweetClientMapper.getChatTweet(TestConstants.TWEET_ID));
        verify(tweetClientService, times(1)).getChatTweet(TestConstants.TWEET_ID);
        verify(basicMapper, times(1)).convertToResponse(chatTweetProjection, ChatTweetResponse.class);
    }
}
