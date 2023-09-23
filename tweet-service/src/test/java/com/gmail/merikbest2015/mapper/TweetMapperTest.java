package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.TweetUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.service.TweetService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TweetMapperTest {

    @Autowired
    private TweetMapper tweetMapper;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private TweetService tweetService;

    private static final PageRequest pageable = PageRequest.of(0, 20);
    private static final List<TweetProjection> tweetProjections = Arrays.asList(
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class),
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class));
    private static final Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);
    private static final HeaderResponse<TweetResponse> headerResponse = new HeaderResponse<>(
            List.of(new TweetResponse(), new TweetResponse()), new HttpHeaders());

    @Test
    public void getTweets() {
        when(tweetService.getTweets(pageable)).thenReturn(pageableTweetProjections);
        when(basicMapper.getHeaderResponse(pageableTweetProjections, TweetResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, tweetMapper.getTweets(pageable));
        verify(tweetService, times(1)).getTweets(pageable);
        verify(basicMapper, times(1)).getHeaderResponse(pageableTweetProjections, TweetResponse.class);
    }

    @Test
    public void getTweetById() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetService.getTweetById(TestConstants.TWEET_ID)).thenReturn(tweetProjection);
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(new TweetResponse());
        assertEquals(new TweetResponse(), tweetMapper.getTweetById(TestConstants.TWEET_ID));
        verify(tweetService, times(1)).getTweetById(TestConstants.TWEET_ID);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
    }

    @Test
    public void getUserTweets() {
        List<TweetUserProjection> tweetUserProjections = TweetServiceTestHelper.createMockTweetUserProjectionList();
        Page<TweetUserProjection> pageableTweetUserProjections = new PageImpl<>(tweetUserProjections, pageable, 20);
        HeaderResponse<TweetUserResponse> headerResponse = new HeaderResponse<>(
                List.of(new TweetUserResponse(), new TweetUserResponse()), new HttpHeaders());
        when(tweetService.getUserTweets(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetUserProjections);
        when(basicMapper.getHeaderResponse(pageableTweetUserProjections, TweetUserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, tweetMapper.getUserTweets(TestConstants.TWEET_ID, pageable));
        verify(tweetService, times(1)).getUserTweets(TestConstants.USER_ID, pageable);
        verify(basicMapper, times(1)).getHeaderResponse(pageableTweetUserProjections, TweetUserResponse.class);
    }
}
