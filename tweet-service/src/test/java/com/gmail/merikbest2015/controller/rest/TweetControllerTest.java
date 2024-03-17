package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-tweet-db.sql", "/sql-test/populate-tweet-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tweet-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class TweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] GET /ui/v1/tweets - Get tweets")
    public void getTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(8)))
                .andExpect(jsonPath("$[0].id").value(48L))
                .andExpect(jsonPath("$[0].text").value("hello world3"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:40:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].author.id").value(2L))
                .andExpect(jsonPath("$[0].images").isEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(0L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/43 - Get tweet by id")
    public void getTweetById() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43L))
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TestConstants.TWEET_DATETIME))
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(TestConstants.LINK))
                .andExpect(jsonPath("$.linkTitle").value(TestConstants.LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(TestConstants.LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(TestConstants.LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value("LARGE"))
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/99 - Should Not Found tweet by id")
    public void getTweetById_ShouldNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/49 - Should tweet deleted")
    public void getTweetById_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/50 - Should user have private profile")
    public void getTweetById_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID, 50)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/51 - Should User blocked")
    public void getTweetById_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID, 51)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/user/2 - Get user tweets by id")
    public void getUserTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + USER_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(8)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].dateTime").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedUsername").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedId").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedTweetId").isNotEmpty())
                .andExpect(jsonPath("$[*].replyType").isNotEmpty())
                .andExpect(jsonPath("$[*].link").isNotEmpty())
                .andExpect(jsonPath("$[*].linkTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].linkDescription").isNotEmpty())
                .andExpect(jsonPath("$[*].linkCover").isNotEmpty())
                .andExpect(jsonPath("$[*].linkCoverSize").isNotEmpty())
                .andExpect(jsonPath("$[*].quoteTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].author").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].retweetsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweetsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].repliesCount").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetLiked").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetRetweeted").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserFollowByOtherUser").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetDeleted").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetBookmarked").isNotEmpty());
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/user/99 - Should user Not Found by id")
    public void getUserTweets_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + USER_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/user/3 - Should user have private profile")
    public void getUserTweets_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + USER_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/user/6 - Should User blocked")
    public void getUserTweets_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + USER_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/media/user/2 - Get user media tweets by id")
    public void getUserMediaTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + MEDIA_USER_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(42L))
                .andExpect(jsonPath("$[0].text").value(TestConstants.YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:33:36"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").value(TestConstants.YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].linkTitle").value(TestConstants.YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").value(TestConstants.YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].author.id").value(2L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(0L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/media/user/99 - Should user Not Found by id")
    public void getUserMediaTweets_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + MEDIA_USER_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/media/user/3 - Should user have private profile")
    public void getUserMediaTweets_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + MEDIA_USER_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/media/user/6 - Should User blocked")
    public void getUserMediaTweets_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + MEDIA_USER_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/images/1 - Get user tweets with images")
    public void getUserTweetImages() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + IMAGES_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].tweetId").value(45L))
                .andExpect(jsonPath("$[0].imageId").value(1L))
                .andExpect(jsonPath("$[0].src").isNotEmpty());
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/images/99 - Should user Not Found by id")
    public void getUserTweetImages_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + IMAGES_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/images/3 - Should user have private profile")
    public void getUserTweetImages_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + IMAGES_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/images/6 - Should User blocked")
    public void getUserTweetImages_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + IMAGES_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/43/info - Get tweet additional info by id")
    public void getTweetAdditionalInfoById() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_INFO, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.author.fullName").value(TestConstants.FULL_NAME))
                .andExpect(jsonPath("$.author.username").value(TestConstants.FULL_NAME))
                .andExpect(jsonPath("$.author.isFollower").value(false))
                .andExpect(jsonPath("$.author.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.author.isUserBlocked").value(false))
                .andExpect(jsonPath("$.author.isUserMuted").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/99/info - Should Not Found tweet by id")
    public void getTweetAdditionalInfoById_ShouldNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_INFO, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/49/info - Should tweet deleted")
    public void getTweetAdditionalInfoById_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_INFO, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/50/info - Should user have private profile")
    public void getTweetAdditionalInfoById_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_INFO, 50)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/51/info - Should User blocked")
    public void getTweetAdditionalInfoById_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_INFO, 51)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/40/replies - Get Replies By Tweet Id")
    public void getRepliesByTweetId() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_REPLIES, 40)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(41L))
                .andExpect(jsonPath("$[0].text").value("test reply"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:31:55"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").value("MrCat"))
                .andExpect(jsonPath("$[0].addressedId").value(2L))
                .andExpect(jsonPath("$[0].addressedTweetId").value(40L))
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].author.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[0].images").isEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(0L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/99/replies - Should Not Found tweet by id")
    public void getRepliesByTweetId_ShouldNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_REPLIES, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/49/replies - Should tweet deleted")
    public void getRepliesByTweetId_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_REPLIES, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/50/replies - Should user have private profile")
    public void getRepliesByTweetId_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_REPLIES, 50)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/49/replies - Should User blocked")
    public void getRepliesByTweetId_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_REPLIES, 51)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/40/quotes - Get Quotes By Tweet Id")
    public void getQuotesByTweetId() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_QUOTES, 40)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(45L))
                .andExpect(jsonPath("$[0].text").value("media tweet test"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:38:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet.id").value(40L))
                .andExpect(jsonPath("$[0].author.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images", hasSize(1)))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(true))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(true))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/99/quotes - Should Not Found tweet by id")
    public void getQuotesByTweetId_ShouldNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_QUOTES, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/49/quotes - Should tweet deleted")
    public void getQuotesByTweetId_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_QUOTES, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/50/quotes - Should user have private profile")
    public void getQuotesByTweetId_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_QUOTES, 50)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/51/quotes - Should User blocked")
    public void getQuotesByTweetId_ShouldUserBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_QUOTES, 51)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/media - Get media tweets")
    public void getMediaTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + MEDIA)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(45L))
                .andExpect(jsonPath("$[0].text").value("media tweet test"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:38:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet.id").value(40L))
                .andExpect(jsonPath("$[0].author.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images", hasSize(1)))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(true))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(true))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/video - Get tweets with video")
    public void getTweetsWithVideo() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + VIDEO)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(42L))
                .andExpect(jsonPath("$[0].text").value(TestConstants.YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:33:36"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").value(TestConstants.YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].linkTitle").value(TestConstants.YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").value(TestConstants.YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].author.id").value(2L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[0].images").isEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(0L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/follower - Get followers tweets")
    public void getFollowersTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + FOLLOWER)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(45L))
                .andExpect(jsonPath("$[0].text").value("media tweet test"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:38:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet.id").value(40L))
                .andExpect(jsonPath("$[0].author.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[0].images[0].id").value(1L))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(true))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(true))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/image/tagged/45 - Get tagged image users")
    public void getTaggedImageUsers() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + IMAGE_TAGGED, 45)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].fullName").value(TestConstants.USERNAME2))
                .andExpect(jsonPath("$[0].username").value(TestConstants.USERNAME2))
                .andExpect(jsonPath("$[0].about").value(TestConstants.ABOUT2))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$[0].isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$[0].isUserBlocked").value(false))
                .andExpect(jsonPath("$[0].isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$[0].isWaitingForApprove").value(false))
                .andExpect(jsonPath("$[0].isFollower").value(true));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/tweets - Should tweet text length more than 280 symbols")
    public void createTweet_ShouldTweetTextLengthMoreThan280Symbols() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.LINK_DESCRIPTION + TestConstants.LINK_DESCRIPTION);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_TWEET_TEXT_LENGTH)));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/tweets - Should tweet text length length is 0")
    public void createTweet_ShouldTweetTextLengthLengthIs0() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.LINK_DESCRIPTION + TestConstants.LINK_DESCRIPTION);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_TWEET_TEXT_LENGTH)));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets - Create tweet with hashtag")
    public void createTweetWithHashtag() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet #test123");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value("test tweet #test123"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isEmpty())
                .andExpect(jsonPath("$.linkTitle").isEmpty())
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").isEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets - Create tweet with link")
    public void createTweetWithLink() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isNotEmpty())
                .andExpect(jsonPath("$.linkTitle").isNotEmpty())
                .andExpect(jsonPath("$.linkDescription").isNotEmpty())
                .andExpect(jsonPath("$.linkCover").isNotEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isNotEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets - Create tweet with YouTube link")
    public void createTweetWithYouTubeLink() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TEXT_WITH_YOUTUBE_LINK);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value(TestConstants.TEXT_WITH_YOUTUBE_LINK))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(TestConstants.YOUTUBE_LINK))
                .andExpect(jsonPath("$.linkTitle").value(TestConstants.YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").value(TestConstants.YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets - Create tweet with list id")
    public void createTweetWithListId() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet with list id");
        tweetRequest.setListId(4L);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(UI_V1_TWEETS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value("test tweet with list id"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isEmpty())
                .andExpect(jsonPath("$.linkTitle").isEmpty())
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").isEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.tweetList.id").value(4L))
                .andExpect(jsonPath("$.tweetList.listName").value("test list name 1"))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] DELETE /ui/v1/tweets/40 - Delete Tweet")
    public void deleteTweet() throws Exception {
        mockMvc.perform(delete(UI_V1_TWEETS + TWEET_ID, 40)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Your Tweet was deleted")));
    }

    @Test
    @DisplayName("[404] DELETE /ui/v1/tweets/99 - Should Tweet Not Found by id")
    public void deleteTweet_ShouldTweetNotFoundById() throws Exception {
        mockMvc.perform(delete(UI_V1_TWEETS + TWEET_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/search/test - Search tweets by text")
    public void searchTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + SEARCH_TEXT, "test")
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(4)));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets/reply/2/43 - Reply tweet by id")
    public void replyTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + REPLY_USER_ID_TWEET_ID, 2, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tweetId").value(43))
                .andExpect(jsonPath("$.notificationType").value("REPLY"))
                .andExpect(jsonPath("$.tweet.id").isNotEmpty())
                .andExpect(jsonPath("$.tweet.text").value("test reply"))
                .andExpect(jsonPath("$.tweet.addressedTweetId").value(43))
                .andExpect(jsonPath("$.tweet.author.id").value(2));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/tweets/reply/2/99 - Should tweet Not Found by id")
    public void replyTweet_ShouldTweetNotFound() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + REPLY_USER_ID_TWEET_ID, 2, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/reply/2/49 - Should tweet deleted")
    public void replyTweet_ShouldTweetDeleted() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + REPLY_USER_ID_TWEET_ID, 2, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/reply/2/50 - Should user have private profile")
    public void replyTweet_ShouldUserHavePrivateProfile() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + REPLY_USER_ID_TWEET_ID, 2, 50)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/reply/2/51 - Should User blocked")
    public void replyTweet_ShouldUserBlocked() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + REPLY_USER_ID_TWEET_ID, 2, 51)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets/quote/2/43 - Quote tweet by id")
    public void quoteTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test quote");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + QUOTE_USER_ID_TWEET_ID, 2, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value("test quote"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isEmpty())
                .andExpect(jsonPath("$.linkTitle").isEmpty())
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").isEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.quoteTweet").isNotEmpty())
                .andExpect(jsonPath("$.quoteTweet.id").value(43))
                .andExpect(jsonPath("$.quoteTweet.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.quoteTweet.dateTime").value(TestConstants.TWEET_DATETIME))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/tweets/quote/2/99 - Should Tweet Not Found by id")
    public void quoteTweet_ShouldTweetNotFound() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test quote");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + QUOTE_USER_ID_TWEET_ID, 2, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/quote/2/49 - Should tweet deleted")
    public void quoteTweet_ShouldTweetDeleted() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + QUOTE_USER_ID_TWEET_ID, 2, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/quote/2/50 - Should user have private profile")
    public void quoteTweet_ShouldUserHavePrivateProfile() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + QUOTE_USER_ID_TWEET_ID, 2, 50)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/quote/2/51 - Should User blocked")
    public void quoteTweet_ShouldUserBlocked() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        mockMvc.perform(post(UI_V1_TWEETS + QUOTE_USER_ID_TWEET_ID, 2, 51)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/reply/change/2/43 - Change Tweet reply type by id")
    public void changeTweetReplyType() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + REPLY_CHANGE_USER_ID_TWEET_ID, 2, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43L))
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TestConstants.TWEET_DATETIME))
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.FOLLOW.toString()))
                .andExpect(jsonPath("$.link").value(TestConstants.LINK))
                .andExpect(jsonPath("$.linkTitle").value(TestConstants.LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(TestConstants.LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(TestConstants.LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value("LARGE"))
                .andExpect(jsonPath("$.author.id").value(2L))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").value(0L))
                .andExpect(jsonPath("$.likedTweetsCount").value(0L))
                .andExpect(jsonPath("$.repliesCount").value(0L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/reply/change/2/99 - Should Tweet Not Found by id")
    public void changeTweetReplyType_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + REPLY_CHANGE_USER_ID_TWEET_ID, 2, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/reply/change/2/41 - Should Tweet Not Found by user")
    public void changeTweetReplyType_ShouldTweetNotFoundByUser() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + REPLY_CHANGE_USER_ID_TWEET_ID, 2, 41)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }
}
