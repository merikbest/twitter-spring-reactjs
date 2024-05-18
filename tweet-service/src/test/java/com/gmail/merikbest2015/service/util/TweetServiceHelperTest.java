package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.TweetImage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class TweetServiceHelperTest extends AbstractServiceTest {

    @Autowired
    private TweetServiceHelper tweetServiceHelper;
    private static User user;
    private static Tweet tweet;
    private static TweetResponse tweetResponse;
    private static final TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);

    @Before
    public void setUp() {
        user = new User();
        user.setId(TestConstants.USER_ID);
        tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test text");
        tweetResponse = new TweetResponse();
        tweetResponse.setText("test text");
        super.setUp();
    }

    @Test
    public void createTweet() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetServiceHelper.createTweet(tweet));
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(tweet.getId(), TweetProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
//        verify(tagClient, times(1)).parseHashtagsFromText(tweet.getId(), new TweetTextRequest(tweet.getText()));
//        verify(notificationClient, times(1)).sendTweetNotificationToSubscribers(tweet.getId());
    }

    @Test
    public void createTweetWithImage() {
        tweet.setImages(Set.of(new TweetImage()));
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetServiceHelper.createTweet(tweet));
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(tweet.getId(), TweetProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
//        verify(tagClient, times(1)).parseHashtagsFromText(tweet.getId(), new TweetTextRequest(tweet.getText()));
//        verify(notificationClient, times(1)).sendTweetNotificationToSubscribers(tweet.getId());
    }

    @Test
    public void createTweetAndParseMetadataFromUrlLink() {
        tweet.setText(TestConstants.TWEET_TEXT);
        tweetResponse.setText(TestConstants.TWEET_TEXT);
        tweetResponse.setLink(TestConstants.LINK);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        TweetResponse response = tweetServiceHelper.createTweet(tweet);
        assertEquals(tweetResponse, response);
        assertEquals(response.getLink(), TestConstants.LINK);
        verify(tweetRepository, times(1)).save(tweet);
        verify(tweetRepository, times(1)).getTweetById(tweet.getId(), TweetProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetProjection, TweetResponse.class);
//        verify(tagClient, times(1)).parseHashtagsFromText(tweet.getId(), new TweetTextRequest(tweet.getText()));
//        verify(notificationClient, times(1)).sendTweetNotificationToSubscribers(tweet.getId());
    }
}
