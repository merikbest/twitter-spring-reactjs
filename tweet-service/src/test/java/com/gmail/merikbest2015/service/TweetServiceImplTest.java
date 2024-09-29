package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.commons.constants.ErrorMessage;
import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.commons.enums.ReplyType;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.TweetErrorMessage;
import com.gmail.merikbest2015.constants.TweetSuccessMessage;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.impl.TweetServiceImpl;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TweetServiceImplTest extends AbstractServiceTest {

    @Autowired
    private TweetServiceImpl tweetService;

    private static final List<TweetProjection> tweetProjections = Arrays.asList(
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class),
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class));
    private static final Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);
    private static final TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);

    @Before
    public void setUp() {
        super.setUp();
        User authUser = new User();
        authUser.setId(TestConstants.USER_ID);
    }

    @Test
    public void getTweets() {
        when(tweetRepository.getTweetsByAuthors(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getTweets(pageable));
        verify(tweetRepository, times(1)).getTweetsByAuthors(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getTweetById() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetService.getTweetById(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void getTweetById_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetById_ShouldTweetDeleted() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(true, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTweetById_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetById_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID,1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getPinnedTweetByUserId() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setPinnedTweet(tweet);
        Optional<TweetUserProjection> tweetUserProjection = Optional.of(
                TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class));
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getPinnedTweetById(user.getPinnedTweet())).thenReturn(tweetUserProjection);
        assertEquals(tweetUserProjection, tweetService.getPinnedTweetByUserId(TestConstants.USER_ID));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getPinnedTweetById(user.getPinnedTweet());
    }

    @Test
    public void getPinnedTweetByUserId_ShouldUserIdNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getPinnedTweetByUserId(TestConstants.USER_ID));
        assertEquals(String.format(ErrorMessage.USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getPinnedTweetByUserId_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getPinnedTweetByUserId(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getPinnedTweetByUserId_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getPinnedTweetByUserId(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUserTweets() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setPinnedTweet(tweet);
        List<TweetUserProjection> tweetUserProjections = new ArrayList<>(TweetServiceTestHelper.createMockTweetUserProjectionList());
        Page<TweetUserProjection> pageableTweetUserProjections = new PageImpl<>(tweetUserProjections, pageable, 20);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetsByUserId(user, user.getPinnedTweet(), pageable)).thenReturn(pageableTweetUserProjections);
        tweetService.getUserTweets(TestConstants.USER_ID, pageable);
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getTweetsByUserId(user, user.getPinnedTweet(), pageable);
    }

    @Test
    public void getUserTweets_ShouldUserIdNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweets(TestConstants.USER_ID, pageable));
        assertEquals(String.format(ErrorMessage.USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweets_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweets(TestConstants.USER_ID, pageable));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweets_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweets(TestConstants.USER_ID, pageable));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUserMediaTweets() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getUserMediaTweets(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getUserMediaTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getUserMediaTweets_ShouldUserIdNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        assertEquals(String.format(ErrorMessage.USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserMediaTweets_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserMediaTweets_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUserTweetImages() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        List<ProfileTweetImageProjection> mockProfileTweetImageProjections = TweetServiceTestHelper.createMockProfileTweetImageProjections();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getUserTweetImages(TestConstants.USER_ID, PageRequest.of(0, 6)))
                .thenReturn(mockProfileTweetImageProjections);
        assertEquals(mockProfileTweetImageProjections, tweetService.getUserTweetImages(TestConstants.USER_ID));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getUserTweetImages(TestConstants.USER_ID, PageRequest.of(0, 6));
    }

    @Test
    public void getUserTweetImages_ShouldUserIdNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweetImages(TestConstants.USER_ID));
        assertEquals(String.format(ErrorMessage.USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweetImages_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweetImages(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweetImages_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweetImages(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById() {
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetAdditionalInfoProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class);
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldTweetDeleted() {
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(true, TweetAdditionalInfoProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetAdditionalInfoProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetAdditionalInfoProjection.class);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getRepliesByTweetId(TestConstants.TWEET_ID)).thenReturn(tweetProjections);
        assertEquals(tweetProjections, tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).getRepliesByTweetId(TestConstants.TWEET_ID);
    }

    @Test
    public void getRepliesByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getQuotesByTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).getQuotesByTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, pageable);
    }

    @Test
    public void getQuotesByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getMediaTweets() {
        when(tweetRepository.getMediaTweets(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getMediaTweets(pageable));
        verify(tweetRepository, times(1)).getMediaTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getTweetsWithVideo() {
        when(tweetRepository.getTweetsWithVideo(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getTweetsWithVideo(pageable));
        verify(tweetRepository, times(1)).getTweetsWithVideo(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getFollowersTweets() {
        when(tweetRepository.getFollowersTweets(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getFollowersTweets(pageable));
        verify(tweetRepository, times(1)).getFollowersTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getTaggedImageUsers() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        Page<UserProjection> userProjections = TweetServiceTestHelper.createUserProjections();
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.getTaggedImageUsers(tweet, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(userRepository, times(1)).getTaggedImageUsers(tweet, pageable);
    }

    @Test
    public void getTaggedImageUsers_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTaggedImageUsers_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTaggedImageUsers_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTaggedImageUsers_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void createNewTweet() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test tweet");
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setText("test tweet");
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetService.createNewTweet(tweet));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void deleteTweet() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test text");
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        assertEquals(TweetSuccessMessage.YOUR_TWEET_WAS_DELETED, tweetService.deleteTweet(TestConstants.TWEET_ID));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void deleteTweet_pinnedTweet() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText("test text");
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setPinnedTweet(tweet);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        assertEquals(TweetSuccessMessage.YOUR_TWEET_WAS_DELETED, tweetService.deleteTweet(TestConstants.TWEET_ID));
        assertNull(user.getPinnedTweet());
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void deleteTweet_ShouldTweetNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.deleteTweet(TestConstants.TWEET_ID));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void searchTweets() {
        String testText = "test text";
        when(tweetRepository.searchTweets(testText, TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.searchTweets(testText, pageable));
        verify(tweetRepository, times(1)).searchTweets(testText, TestConstants.USER_ID, pageable);
    }

    @Test
    public void replyTweet() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText(TestConstants.TEST_TWEET_TEXT);
        tweet.setAuthor(user);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setId(TestConstants.TWEET_ID);
        tweetResponse.setText(TestConstants.TEST_TWEET_TEXT);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetService.replyTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, tweet));
        verify(tweetRepository, times(1)).updateRepliesCount(tweet);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).addReply(TestConstants.TWEET_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void replyTweet_ShouldTweetNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, new Tweet()));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void replyTweet_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, tweet));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void replyTweet_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, tweet));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void replyTweet_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, tweet));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void quoteTweet() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText(TestConstants.TEST_TWEET_TEXT);
        tweet.setAuthor(user);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setId(TestConstants.TWEET_ID);
        tweetResponse.setText(TestConstants.TEST_TWEET_TEXT);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(tweet.getId(), TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(basicMapper.convertToResponse(tweetProjection, TweetResponse.class)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetService.quoteTweet(TestConstants.TWEET_ID, tweet));
        verify(tweetRepository, times(1)).updateQuotesCount(tweet);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, Tweet.class);
        verify(tweetRepository, times(1)).addQuote(TestConstants.TWEET_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void quoteTweet_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void quoteTweet_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(TweetErrorMessage.TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void quoteTweet_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void quoteTweet_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, Tweet.class)).thenReturn(Optional.of(tweet));
        when(userRepository.isUserHavePrivateProfile(TestConstants.USER_ID, 1L)).thenReturn(true);
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(ErrorMessage.USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void changeTweetReplyType() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        when(tweetRepository.getTweetByAuthorIdAndTweetId(TestConstants.TWEET_ID, TestConstants.USER_ID))
                .thenReturn(Optional.of(tweet));
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class))
                .thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetService.changeTweetReplyType(TestConstants.TWEET_ID, ReplyType.MENTION));
        verify(tweetRepository, times(1)).getTweetByAuthorIdAndTweetId(TestConstants.TWEET_ID, TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void changeTweetReplyType_ShouldTweetNotFound() {
        when(tweetRepository.getTweetByAuthorIdAndTweetId(TestConstants.TWEET_ID, TestConstants.USER_ID))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.changeTweetReplyType(TestConstants.TWEET_ID, ReplyType.MENTION));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void changeTweetReplyType_ShouldAuthorTweetNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        when(tweetRepository.getTweetByAuthorIdAndTweetId(TestConstants.TWEET_ID, TestConstants.USER_ID))
                .thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.changeTweetReplyType(TestConstants.TWEET_ID, ReplyType.MENTION));
        assertEquals(TweetErrorMessage.TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
