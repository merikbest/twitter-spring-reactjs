package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.impl.TweetServiceImpl;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TweetServiceImplTest extends AbstractAuthTest {

    @Autowired
    private TweetServiceImpl tweetService;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private TweetServiceHelper tweetServiceHelper;

    @MockBean
    private RetweetRepository retweetRepository;

    @MockBean
    private UserService userService;

    @MockBean
    private TagClient tagClient;

    private static final List<TweetProjection> tweetProjections = Arrays.asList(
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class),
            TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class));
    private static final Page<TweetProjection> pageableTweetProjections = new PageImpl<>(tweetProjections, pageable, 20);

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getTweets() {
        when(tweetRepository.getTweetsByAuthors(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getTweets(pageable));
        verify(tweetRepository, times(1)).getTweetsByAuthors(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getTweetById() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        assertEquals(tweetProjection, tweetService.getTweetById(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetProjection.class);
    }

    @Test
    public void getTweetById_ShouldTweetNotFound() {
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetById_ShouldTweetDeleted() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(true, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTweetById_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetById_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetById(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUserTweets() {
        List<TweetUserProjection> tweetUserProjections = new ArrayList<>(TweetServiceTestHelper.createMockTweetUserProjectionList());
        List<RetweetProjection> retweetProjections = TweetServiceTestHelper.createMockRetweetProjectionList();
        Page<TweetUserProjection> pageableTweetUserProjections = new PageImpl<>(tweetUserProjections, pageable, 20);
        int totalPages = tweetUserProjections.size() + retweetProjections.size();
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setPinnedTweet(tweet);
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetsByUserId(TestConstants.USER_ID)).thenReturn(tweetUserProjections);
        when(retweetRepository.getRetweetsByUserId(TestConstants.USER_ID)).thenReturn(retweetProjections);
        when(tweetServiceHelper.combineTweetsArrays(tweetUserProjections, retweetProjections))
                .thenReturn(tweetUserProjections);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetUserProjection.class))
                .thenReturn(Optional.of(tweetUserProjections.get(0)));
        when(tweetServiceHelper.getPageableTweetProjectionList(pageable, tweetUserProjections, totalPages))
                .thenReturn(pageableTweetUserProjections);
        tweetService.getUserTweets(TestConstants.USER_ID, pageable);
        verify(userService, times(1)).getUserById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getTweetsByUserId(TestConstants.USER_ID);
        verify(retweetRepository, times(1)).getRetweetsByUserId(TestConstants.USER_ID);
        verify(tweetServiceHelper, times(1)).combineTweetsArrays(tweetUserProjections, retweetProjections);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetUserProjection.class);
    }

    @Test
    public void getUserTweets_ShouldRemovePinnedTweet() {
        TweetUserProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class);
        List<TweetUserProjection> tweetUserProjections = new ArrayList<>(TweetServiceTestHelper.createMockTweetUserProjectionList());
        List<RetweetProjection> retweetProjections = TweetServiceTestHelper.createMockRetweetProjectionList();
        Page<TweetUserProjection> pageableTweetUserProjections = new PageImpl<>(tweetUserProjections, pageable, 20);
        int totalPages = tweetUserProjections.size() + retweetProjections.size();
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setPinnedTweet(tweet);
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getTweetsByUserId(TestConstants.USER_ID)).thenReturn(tweetUserProjections);
        when(retweetRepository.getRetweetsByUserId(TestConstants.USER_ID)).thenReturn(retweetProjections);
        when(tweetServiceHelper.combineTweetsArrays(tweetUserProjections, retweetProjections))
                .thenReturn(tweetUserProjections);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetUserProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(tweetServiceHelper.getPageableTweetProjectionList(pageable, tweetUserProjections, totalPages))
                .thenReturn(pageableTweetUserProjections);
        tweetService.getUserTweets(TestConstants.USER_ID, pageable);
        verify(userService, times(1)).getUserById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getTweetsByUserId(TestConstants.USER_ID);
        verify(retweetRepository, times(1)).getRetweetsByUserId(TestConstants.USER_ID);
        verify(tweetServiceHelper, times(1)).combineTweetsArrays(tweetUserProjections, retweetProjections);
        verify(tweetRepository, times(1)).getTweetById(TestConstants.TWEET_ID, TweetUserProjection.class);
    }

    @Test
    public void getUserTweets_ShouldUserIdNotFound() {
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweets(TestConstants.USER_ID, pageable));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweets_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweets(TestConstants.USER_ID, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweets_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweets(TestConstants.USER_ID, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUserMediaTweets() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getUserMediaTweets(TestConstants.USER_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        verify(userService, times(1)).getUserById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getUserMediaTweets(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getUserMediaTweets_ShouldUserIdNotFound() {
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserMediaTweets_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserMediaTweets_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserMediaTweets(TestConstants.USER_ID, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUserTweetImages() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        List<ProfileTweetImageProjection> mockProfileTweetImageProjections = TweetServiceTestHelper.createMockProfileTweetImageProjections();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(tweetRepository.getUserTweetImages(TestConstants.USER_ID, PageRequest.of(0, 6)))
                .thenReturn(mockProfileTweetImageProjections);
        assertEquals(mockProfileTweetImageProjections, tweetService.getUserTweetImages(TestConstants.USER_ID));
        verify(userService, times(1)).getUserById(TestConstants.USER_ID);
        verify(tweetRepository, times(1)).getUserTweetImages(TestConstants.USER_ID, PageRequest.of(0, 6));
    }

    @Test
    public void getUserTweetImages_ShouldUserIdNotFound() {
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweetImages(TestConstants.USER_ID));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweetImages_ShouldUserNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweetImages(TestConstants.USER_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweetImages_ShouldUserProfileBlocked() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        TweetServiceTestHelper.mockAuthenticatedUserId();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getUserTweetImages(TestConstants.USER_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
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
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldTweetDeleted() {
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(true, TweetAdditionalInfoProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userService.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetAdditionalInfoProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTweetAdditionalInfoById_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        TweetAdditionalInfoProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetAdditionalInfoProjection.class);
        when(tweetRepository.getTweetById(TestConstants.TWEET_ID, TweetAdditionalInfoProjection.class)).thenReturn(Optional.of(tweetProjection));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTweetAdditionalInfoById(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getRepliesByTweetId(TestConstants.TWEET_ID)).thenReturn(tweetProjections);
        assertEquals(tweetProjections, tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(tweetRepository, times(1)).getRepliesByTweetId(TestConstants.TWEET_ID);
    }

    @Test
    public void getRepliesByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getRepliesByTweetId_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getRepliesByTweetId(TestConstants.TWEET_ID));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetRepository.getQuotesByTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, pageable)).thenReturn(pageableTweetProjections);
        assertEquals(pageableTweetProjections, tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(tweetRepository, times(1)).getQuotesByTweet(TestConstants.USER_ID, TestConstants.TWEET_ID, pageable);
    }

    @Test
    public void getQuotesByTweetId_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getQuotesByTweetId_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getQuotesByTweetId(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.getTaggedImageUsers(tweet, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(userService, times(1)).getTaggedImageUsers(tweet, pageable);
    }

    @Test
    public void getTaggedImageUsers_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTaggedImageUsers_ShouldTweetDeleted() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        tweet.setDeleted(true);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(TWEET_DELETED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getTaggedImageUsers_ShouldUserNotFound() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getTaggedImageUsers_ShouldUserProfileBlocked() {
        TweetServiceTestHelper.mockAuthenticatedUserId();
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setAuthor(user);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.getTaggedImageUsers(TestConstants.TWEET_ID, pageable));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void createNewTweet() {
        Tweet tweet = new Tweet();
        tweet.setText("test tweet");
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setText("test tweet");
        when(tweetServiceHelper.createTweet(tweet)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetService.createNewTweet(tweet));
        verify(tweetServiceHelper, times(1)).createTweet(tweet);
    }

    @Test
    public void deleteTweet() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userService.getAuthUser()).thenReturn(user);
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.of(new Tweet()));
        assertEquals("Your Tweet was deleted", tweetService.deleteTweet(TestConstants.TWEET_ID));
        verify(tweetRepository, times(1)).getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID);
        verify(tagClient, times(1)).deleteTagsByTweetId(TestConstants.TWEET_ID);
    }

    @Test
    public void deleteTweet_pinnedTweet() {
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setPinnedTweet(tweet);
        when(userService.getAuthUser()).thenReturn(user);
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        assertEquals("Your Tweet was deleted", tweetService.deleteTweet(TestConstants.TWEET_ID));
        assertNull(user.getPinnedTweet());
        verify(tweetRepository, times(1)).getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID);
        verify(tagClient, times(1)).deleteTagsByTweetId(TestConstants.TWEET_ID);
    }

    @Test
    public void deleteTweet_ShouldTweetNotFound() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        when(userService.getAuthUser()).thenReturn(user);
        when(tweetRepository.getTweetByUserId(TestConstants.USER_ID, TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.deleteTweet(TestConstants.TWEET_ID));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
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
        tweet.setAuthor(user);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setId(TestConstants.TWEET_ID);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetServiceHelper.createTweet(tweet)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetService.replyTweet(TestConstants.TWEET_ID, tweet));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(tweetServiceHelper, times(1)).createTweet(tweet);
        verify(tweetRepository, times(1)).addReply(TestConstants.TWEET_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void replyTweet_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.TWEET_ID, tweet));
        assertEquals(TWEET_DELETED, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.TWEET_ID, tweet));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.replyTweet(TestConstants.TWEET_ID, tweet));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void quoteTweet() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setAuthor(user);
        TweetResponse tweetResponse = new TweetResponse();
        tweetResponse.setId(TestConstants.TWEET_ID);
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(tweetServiceHelper.createTweet(tweet)).thenReturn(tweetResponse);
        assertEquals(tweetResponse, tweetService.quoteTweet(TestConstants.TWEET_ID, tweet));
        verify(tweetRepository, times(1)).findById(TestConstants.TWEET_ID);
        verify(tweetServiceHelper, times(1)).createTweet(tweet);
        verify(tweetRepository, times(1)).addQuote(TestConstants.TWEET_ID, TestConstants.TWEET_ID);
    }

    @Test
    public void quoteTweet_ShouldTweetNotFound() {
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(TWEET_DELETED, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
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
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        when(userService.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userService.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> tweetService.quoteTweet(TestConstants.TWEET_ID, new Tweet()));
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void changeTweetReplyType() {
        TweetProjection tweetProjection = TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class);
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
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
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
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
