package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAdditionalInfoUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.dto.response.user.TaggedUserResponse;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.BookmarkRepository;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TweetProjectionHelperTest extends AbstractAuthTest {

    @Autowired
    private TweetProjectionHelper tweetProjectionHelper;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private LikeTweetRepository likeTweetRepository;

    @MockBean
    private RetweetRepository retweetRepository;

    @MockBean
    private BookmarkRepository bookmarkRepository;

    @MockBean
    private UserClient userClient;

    @MockBean
    private ListsClient listsClient;

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getTweetProjection() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetProjectionHelper.getTweetProjection(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void getTweetUserProjection() {
        TweetUserProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetUserProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetProjectionHelper.getTweetUserProjection(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetUserProjection.class);
    }

    @Test
    public void getTaggedImageUsers() {
        List<TaggedUserResponse> taggedUserResponses = List.of(new TaggedUserResponse(), new TaggedUserResponse());
        when(tweetRepository.getTaggedImageUserIds(TestConstants.TWEET_ID)).thenReturn(ids);
        when(userClient.getTaggedImageUsers(new IdsRequest(ids))).thenReturn(taggedUserResponses);
        assertEquals(taggedUserResponses, tweetProjectionHelper.getTaggedImageUsers(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTaggedImageUserIds(TestConstants.TWEET_ID);
        verify(userClient, times(1)).getTaggedImageUsers(new IdsRequest(ids));
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
    public void isUserFollowByOtherUser() {
        when(userClient.isUserFollowByOtherUser(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(tweetProjectionHelper.isUserFollowByOtherUser(TestConstants.USER_ID));
        verify(userClient, times(1)).isUserFollowByOtherUser(TestConstants.USER_ID);
    }

    @Test
    public void getTweetAuthor() {
        TweetAuthorResponse tweetAuthorResponse = new TweetAuthorResponse();
        when(userClient.getTweetAuthor(TestConstants.USER_ID)).thenReturn(tweetAuthorResponse);
        assertEquals(tweetAuthorResponse, tweetProjectionHelper.getTweetAuthor(TestConstants.USER_ID));
        verify(userClient, times(1)).getTweetAuthor(TestConstants.USER_ID);
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

    @Test
    public void getTweetAdditionalInfoUser() {
        TweetAdditionalInfoUserResponse response = new TweetAdditionalInfoUserResponse();
        when(userClient.getTweetAdditionalInfoUser(TestConstants.USER_ID)).thenReturn(response);
        assertEquals(response, tweetProjectionHelper.getTweetAdditionalInfoUser(TestConstants.USER_ID));
        verify(userClient, times(1)).getTweetAdditionalInfoUser(TestConstants.USER_ID);
    }

    @Test
    public void getChatTweetUser() {
        ChatTweetUserResponse response = new ChatTweetUserResponse();
        when(userClient.getChatTweetUser(TestConstants.USER_ID)).thenReturn(response);
        assertEquals(response, tweetProjectionHelper.getChatTweetUser(TestConstants.USER_ID));
        verify(userClient, times(1)).getChatTweetUser(TestConstants.USER_ID);
    }
}
