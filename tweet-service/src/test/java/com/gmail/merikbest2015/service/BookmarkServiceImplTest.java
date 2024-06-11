package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Bookmark;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.BookmarkProjection;
import com.gmail.merikbest2015.service.impl.BookmarkServiceImpl;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static com.gmail.merikbest2015.TweetServiceTestHelper.createMockBookmarkProjectionList;
import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookmarkServiceImplTest extends AbstractServiceTest {

    @Autowired
    private BookmarkServiceImpl bookmarkService;

    private static Tweet tweet;
    private static User authUser;

    @Before
    public void setUp() {
        super.setUp();
        authUser = new User();
        authUser.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(authUser));
        tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setDeleted(false);
        tweet.setAuthor(authUser);
    }

    @Test
    public void getUserBookmarks() {
        Page<BookmarkProjection> bookmark = new PageImpl<>(createMockBookmarkProjectionList(), pageable, 20);
        when(bookmarkRepository.getUserBookmarks(authUser, pageable)).thenReturn(bookmark);
        assertEquals(bookmark, bookmarkService.getUserBookmarks(pageable));
        verify(bookmarkRepository, times(1)).getUserBookmarks(authUser, pageable);
    }

    @Test
    public void processUserBookmarks_ShouldDeleteBookmark() {
        Bookmark bookmark = new Bookmark();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(bookmarkRepository.getUserBookmark(authUser, tweet)).thenReturn(bookmark);
        assertFalse(bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        verify(bookmarkRepository, times(1)).getUserBookmark(authUser, tweet);
        verify(bookmarkRepository, times(1)).delete(bookmark);
    }

    @Test
    public void processUserBookmarks_ShouldCreateBookmark() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(bookmarkRepository.getUserBookmark(authUser, tweet)).thenReturn(null);
        assertTrue(bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        verify(bookmarkRepository, times(1)).getUserBookmark(authUser, tweet);
        verify(bookmarkRepository, times(1)).save(any());
    }

    @Test
    public void processUserBookmarks_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void processUserBookmarks_ShouldTweetDeleted() {
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void processUserBookmarks_ShouldUserNotFound() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> bookmarkService.processUserBookmarks(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void processUserBookmarks_ShouldUserProfileBlocked() {
        User authUser = new User();
        authUser.setId(1L);
        tweet.setAuthor(authUser);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
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
}
