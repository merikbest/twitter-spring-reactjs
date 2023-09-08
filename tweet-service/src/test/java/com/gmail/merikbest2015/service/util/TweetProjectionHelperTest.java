package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.user.TaggedUserResponse;
import com.gmail.merikbest2015.feign.ListsClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.BookmarkRepository;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TweetProjectionHelperTest {

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
        List<Long> ids = List.of(1L, 2L, 3L);
        List<TaggedUserResponse> taggedUserResponses = List.of(new TaggedUserResponse(), new TaggedUserResponse());
        when(tweetRepository.getTaggedImageUserIds(TestConstants.TWEET_ID)).thenReturn(ids);
        when(userClient.getTaggedImageUsers(new IdsRequest(ids))).thenReturn(taggedUserResponses);
        assertEquals(taggedUserResponses, tweetProjectionHelper.getTaggedImageUsers(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTaggedImageUserIds(TestConstants.TWEET_ID);
        verify(userClient, times(1)).getTaggedImageUsers(new IdsRequest(ids));
    }
}
