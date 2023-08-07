package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Bookmark;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.BookmarkRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.BookmarkProjection;
import com.gmail.merikbest2015.service.impl.BookmarkServiceImpl;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class BookmarkServiceImplTest {

    @Autowired
    private BookmarkServiceImpl bookmarkService;

    @MockBean
    private BookmarkRepository bookmarkRepository;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private UserClient userClient;

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();
    private static final PageRequest pageable = PageRequest.of(0, 20);
    private static Tweet tweet;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
        tweet = new Tweet();
        tweet.setDeleted(false);
        tweet.setAuthorId(TestConstants.USER_ID);
    }

    @Test
    public void getUserBookmarks() {
        Page<BookmarkProjection> bookmark = new PageImpl<>(createMockBookmarkProjectionList(), pageable, 20);
        when(bookmarkRepository.getUserBookmarks(TestConstants.USER_ID, pageable)).thenReturn(bookmark);
        assertEquals(bookmark, bookmarkService.getUserBookmarks(pageable));
        verify(bookmarkRepository, times(1)).getUserBookmarks(TestConstants.USER_ID, pageable);
    }

    @Test
    public void processUserBookmarks_ShouldDeleteBookmark() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(bookmarkRepository.getUserBookmark(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(new Bookmark());
        assertFalse(bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        verify(bookmarkRepository, times(1)).getUserBookmark(TestConstants.USER_ID, TestConstants.TWEET_ID);
        verify(bookmarkRepository, times(1)).delete(new Bookmark());
    }

    @Test
    public void processUserBookmarks_ShouldCreateBookmark() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(bookmarkRepository.getUserBookmark(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(null);
        assertTrue(bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        verify(bookmarkRepository, times(1)).getUserBookmark(TestConstants.USER_ID, TestConstants.TWEET_ID);
        verify(bookmarkRepository, times(1)).save(new Bookmark(TestConstants.USER_ID, TestConstants.TWEET_ID));
    }

    @Test
    public void processUserBookmarks_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void processUserBookmarks_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void processUserBookmarks_ShouldUserNotFound() {
        tweet.setAuthorId(1L);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void processUserBookmarks_ShouldUserProfileBlocked() {
        tweet.setAuthorId(1L);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getIsTweetBookmarked() {
        when(bookmarkRepository.isUserBookmarkedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(bookmarkService.getIsTweetBookmarked(TestConstants.TWEET_ID));
        verify(bookmarkRepository, times(1)).isUserBookmarkedTweet(TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    private static List<BookmarkProjection> createMockBookmarkProjectionList() {
        BookmarkProjection bookmarkProjection1 = factory.createProjection(
                BookmarkProjection.class,
                Map.of(
                        "id", 1L,
                        "bookmarkDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection()
                ));
        BookmarkProjection bookmarkProjection2 = factory.createProjection(
                BookmarkProjection.class,
                Map.of(
                        "id", 2L,
                        "bookmarkDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection()
                ));
        return Arrays.asList(bookmarkProjection1, bookmarkProjection2);
    }
}
