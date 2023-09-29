package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.ScheduledTweetService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ScheduledTweetMapperTest extends AbstractAuthTest {

    @Autowired
    private ScheduledTweetMapper scheduledTweetMapper;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private ScheduledTweetService scheduledTweetService;

    private static final List<TweetProjection> tweetProjections = Arrays.asList(
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class),
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class));
    private static final Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);
    private static final TweetRequest tweetRequest = new TweetRequest();
    private static final TweetResponse tweetResponse = new TweetResponse();
    private static final TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);

    @Test
    public void getScheduledTweets() {
        HeaderResponse<TweetResponse> headerResponse = new HeaderResponse<>(
                List.of(new TweetResponse(), new TweetResponse()), new HttpHeaders());
        when(scheduledTweetService.getScheduledTweets(pageable)).thenReturn(pageableTweetProjections);
        when(basicMapper.getHeaderResponse(pageableTweetProjections, TweetResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, scheduledTweetMapper.getScheduledTweets(pageable));
        verify(scheduledTweetService, times(1)).getScheduledTweets(pageable);
        verify(basicMapper, times(1)).getHeaderResponse(pageableTweetProjections, TweetResponse.class);
    }

    @Test
    public void createScheduledTweet() {
        when(basicMapper.convertToResponse(tweetRequest, Tweet.class)).thenReturn(new Tweet());
        when(scheduledTweetService.createScheduledTweet(new Tweet())).thenReturn(tweetProjection);
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, scheduledTweetMapper.createScheduledTweet(tweetRequest));
        verify(basicMapper, times(1)).convertToResponse(tweetRequest, Tweet.class);
        verify(scheduledTweetService, times(1)).createScheduledTweet(new Tweet());
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
    }

    @Test
    public void updateScheduledTweet() {
        when(basicMapper.convertToResponse(tweetRequest, Tweet.class)).thenReturn(new Tweet());
        when(scheduledTweetService.updateScheduledTweet(new Tweet())).thenReturn(tweetProjection);
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, scheduledTweetMapper.updateScheduledTweet(tweetRequest));
        verify(basicMapper, times(1)).convertToResponse(tweetRequest, Tweet.class);
        verify(scheduledTweetService, times(1)).updateScheduledTweet(new Tweet());
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
    }

    @Test
    public void deleteScheduledTweets() {
        TweetDeleteRequest tweetRequest = new TweetDeleteRequest();
        when(scheduledTweetService.deleteScheduledTweets(tweetRequest.getTweetsIds())).thenReturn("Scheduled tweets deleted.");
        assertEquals("Scheduled tweets deleted.", scheduledTweetMapper.deleteScheduledTweets(tweetRequest));
        verify(scheduledTweetService, times(1)).deleteScheduledTweets(tweetRequest.getTweetsIds());
    }
}
