package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.TweetImage;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class TweetServiceHelperTest extends AbstractAuthTest {

    @Autowired
    private TweetServiceHelper tweetServiceHelper;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private TweetValidationHelper tweetValidationHelper;

    @MockBean
    private NotificationClient notificationClient;

    @MockBean
    private TagClient tagClient;

    @MockBean
    private BasicMapper basicMapper;

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void createTweet() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test text");
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setText("test text");
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetServiceHelper.createTweet(tweet));
        verify(tweetValidationHelper, times(1)).checkTweetTextLength(tweet.getText());
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(tweet.getId(), TweetProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
        verify(tagClient, times(1)).parseHashtagsFromText(tweet.getId(), new TweetTextRequest(tweet.getText()));
        verify(notificationClient, times(1)).sendTweetNotificationToSubscribers(tweet.getId());
    }

    @Test
    public void createTweetWithImage() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test text");
        tweet.setImages(Set.of(new TweetImage()));
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setText("test text");
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetServiceHelper.createTweet(tweet));
        verify(tweetValidationHelper, times(1)).checkTweetTextLength(tweet.getText());
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(tweet.getId(), TweetProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
        verify(tagClient, times(1)).parseHashtagsFromText(tweet.getId(), new TweetTextRequest(tweet.getText()));
        verify(notificationClient, times(1)).sendTweetNotificationToSubscribers(tweet.getId());
    }

    @Test
    public void createTweetAndParseMetadataFromUrlLink() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText(TestConstants.TWEET_TEXT);
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setText(TestConstants.TWEET_TEXT);
        tweetResponse.setLink(TestConstants.LINK);
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        TweetResponse response = tweetServiceHelper.createTweet(tweet);
        assertEquals(tweetResponse, response);
        assertEquals(response.getLink(), TestConstants.LINK);
        verify(tweetValidationHelper, times(1)).checkTweetTextLength(tweet.getText());
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(tweet.getId(), TweetProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
        verify(tagClient, times(1)).parseHashtagsFromText(tweet.getId(), new TweetTextRequest(tweet.getText()));
        verify(notificationClient, times(1)).sendTweetNotificationToSubscribers(tweet.getId());
    }
}
