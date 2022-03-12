package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.gmail.merikbest2015.twitterspringreactjs.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets - Get tweets")
    public void getTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC))
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
                .andExpect(jsonPath("$[0].user.id").value(2L))
                .andExpect(jsonPath("$[0].poll.id").value(8L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/43 - Get tweet by id")
    public void getTweetById() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43L))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value("LARGE"))
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/tweets/99 - Should Not Found tweet by id")
    public void getTweetById_ShouldNotFound() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/media - Get media tweets")
    public void getMediaTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/media"))
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
                .andExpect(jsonPath("$[0].user.id").value(1L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/video - Get tweets with video")
    public void getTweetsWithVideo() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/video"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(42L))
                .andExpect(jsonPath("$[0].text").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:33:36"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].linkTitle").value(YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").value(YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/follower - Get followers tweets")
    public void getFollowersTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/follower"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(9)))
                .andExpect(jsonPath("$[6].id").value(42L))
                .andExpect(jsonPath("$[6].text").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[6].dateTime").value("2021-10-03T20:33:36"))
                .andExpect(jsonPath("$[6].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[6].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[6].addressedId").isEmpty())
                .andExpect(jsonPath("$[6].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[6].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[6].link").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[6].linkTitle").value(YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$[6].linkDescription").isEmpty())
                .andExpect(jsonPath("$[6].linkCover").value(YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$[6].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[6].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[6].user.id").value(2L))
                .andExpect(jsonPath("$[6].poll").isEmpty())
                .andExpect(jsonPath("$[6].images").isEmpty())
                .andExpect(jsonPath("$[6].retweetsCount").value(0L))
                .andExpect(jsonPath("$[6].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[6].repliesCount").value(0L))
                .andExpect(jsonPath("$[6].isTweetLiked").value(false))
                .andExpect(jsonPath("$[6].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[6].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[6].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[6].isTweetBookmarked").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/schedule - Get scheduled tweets")
    public void getScheduledTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/schedule"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(39L))
                .andExpect(jsonPath("$[0].text").value("test tweet"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:29:03"))
                .andExpect(jsonPath("$[0].scheduledDate").value("3021-10-03T20:33:36"))
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
                .andExpect(jsonPath("$[0].user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/tweets - Should tweet text length more than 280 symbols")
    public void createTweet_ShouldTweetTextLengthMoreThan280Symbols() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(LINK_DESCRIPTION + LINK_DESCRIPTION);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect tweet text length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/tweets - Should tweet text length length is 0")
    public void createTweet_ShouldTweetTextLengthLengthIs0() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(LINK_DESCRIPTION + LINK_DESCRIPTION);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect tweet text length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets - Create tweet with hashtag")
    public void createTweetWithHashtag() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet #test123");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC)
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
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets - Create tweet with link")
    public void createTweetWithLink() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
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
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets - Create tweet with YouTube link")
    public void createTweetWithYouTubeLink() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TEXT_WITH_YOUTUBE_LINK);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value(TEXT_WITH_YOUTUBE_LINK))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$.linkTitle").value(YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").value(YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets/poll - Create tweet with poll")
    public void createTweetWithPoll() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("Choice 2");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/poll")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value(TEST_TWEET_TEXT))
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
                .andExpect(jsonPath("$.user.id").value(2L))
                .andExpect(jsonPath("$.poll.id").value(100L))
                .andExpect(jsonPath("$.poll.pollChoices[0].id").isNotEmpty())
                .andExpect(jsonPath("$.poll.pollChoices[1].id").isNotEmpty())
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/tweets/poll - Should incorrect poll choices size is 1")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesSizeIs1() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/poll")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect poll choices")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/tweets/poll - Should incorrect poll choices size is 5")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesSizeIs5() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("Choice 2");
        pollChoiceList.add("Choice 3");
        pollChoiceList.add("Choice 4");
        pollChoiceList.add("Choice 5");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/poll")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect poll choices")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/tweets/poll - Should incorrect poll choices text length is 0")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesTextLengthIs0() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/poll")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect choice text length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/tweets/poll - Should incorrect poll choices text length more than 25")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesTextLengthMoreThan25() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add(LINK_DESCRIPTION);
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/poll")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect choice text length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets/schedule - Create Scheduled Tweet")
    public void createScheduledTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setScheduledDate(LocalDateTime.parse(TWEET_SCHEDULED_DATETIME));

        mockMvc.perform(post(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(100L))
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").value(TWEET_SCHEDULED_DATETIME))
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
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/tweets/schedule - Update Scheduled Tweet")
    public void updateScheduledTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText("test tweet2");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(39L))
                .andExpect(jsonPath("$.text").value("test tweet2"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").value(TWEET_SCHEDULED_DATETIME))
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
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/tweets/schedule - Should tweet text length length is 0")
    public void updateScheduledTweet_ShouldTweetTextLengthLengthIs0() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText("");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect tweet text length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/tweets/schedule - Should tweet text length more than 280 symbols")
    public void updateScheduledTweet_ShouldTweetTextLengthMoreThan280Symbols() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText(LINK_DESCRIPTION + LINK_DESCRIPTION);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect tweet text length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] PUT /api/v1/tweets/schedule - Should Tweet Not Found")
    public void updateScheduledTweet_ShouldTweetNotFound() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(99L);
        tweetRequest.setText("test tweet99");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] DELETE /api/v1/tweets/schedule - Delete scheduled Tweets")
    public void deleteScheduledTweets() throws Exception {
        TweetDeleteRequest tweetDeleteRequest = new TweetDeleteRequest();
        tweetDeleteRequest.setTweetsIds(List.of(42L));

        mockMvc.perform(delete(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetDeleteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Scheduled tweets deleted.")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] DELETE /api/v1/tweets/40 - Delete Tweet")
    public void deleteTweet() throws Exception {
        mockMvc.perform(delete(URL_TWEETS_BASIC + "/40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(40))
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.dateTime").value("2021-10-03T20:29:03"))
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
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isNotEmpty())
                .andExpect(jsonPath("$.poll.id").value(2))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.retweetsCount").isEmpty())
                .andExpect(jsonPath("$.likedTweetsCount").isEmpty())
                .andExpect(jsonPath("$.repliesCount").isEmpty())
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(true))
                .andExpect(jsonPath("$.isTweetBookmarked").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/search/test - Search tweets by text")
    public void searchTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/search/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(5)))
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
                .andExpect(jsonPath("$[0].user.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images", hasSize(5)))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/like/43 - Like tweet by id")
    public void likeTweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/like/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.notificationCondition").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/tweets/like/99 - Should Tweet Not Found by id")
    public void likeTweet_ShouldTweetNotFoundById() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/like/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/like/45 - Unlike tweet by id")
    public void unlikeTweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/like/45"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(45))
                .andExpect(jsonPath("$.text").value("media tweet test"))
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.notificationCondition").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/retweet/43 - Retweet tweet by id")
    public void retweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/retweet/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.notificationCondition").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/tweets/retweet/99 - Should Tweet Not Found by id")
    public void retweet_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/retweet/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/retweet/45 - UnRetweet tweet by id")
    public void unretweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/retweet/45"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(45))
                .andExpect(jsonPath("$.text").value("media tweet test"))
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.notificationCondition").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets/reply/43 - Reply tweet by id")
    public void replyTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/reply/43")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tweetId").value(43))
                .andExpect(jsonPath("$.notificationType").value("REPLY"))
                .andExpect(jsonPath("$.tweet.id").isNotEmpty())
                .andExpect(jsonPath("$.tweet.text").value("test reply"))
                .andExpect(jsonPath("$.tweet.addressedTweetId").value(43))
                .andExpect(jsonPath("$.tweet.user.id").value(2));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/tweets/reply/99 - Should tweet Not Found by id")
    public void replyTweet_ShouldTweetNotFound() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/reply/99")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets/quote/43 - Quote tweet by id")
    public void quoteTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test quote");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/quote/43")
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
                .andExpect(jsonPath("$.user.id").value(2L))
                .andExpect(jsonPath("$.quoteTweet").isNotEmpty())
                .andExpect(jsonPath("$.quoteTweet.id").value(43))
                .andExpect(jsonPath("$.quoteTweet.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.quoteTweet.dateTime").value(TWEET_DATETIME))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/tweets/quote/99 - Should Tweet Not Found by id")
    public void quoteTweet_ShouldTweetNotFound() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test quote");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/quote/99")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/tweets/reply/change/43 - Change Tweet reply type by id")
    public void changeTweetReplyType() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/reply/change/43")
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43L))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.scheduledDate").isEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.FOLLOW.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value("LARGE"))
                .andExpect(jsonPath("$.user.id").value(2L))
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
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/tweets/reply/change/99 - Should Tweet Not Found by id")
    public void changeTweetReplyType_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/reply/change/99")
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/tweets/reply/change/41 - Should Tweet Not Found by user")
    public void changeTweetReplyType_ShouldTweetNotFoundByUser() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/reply/change/41")
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/tweets/vote - Vote in poll")
    public void voteInPoll() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(2L);
        voteRequest.setPollChoiceId(9L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/vote")
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(40))
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.dateTime").value("2021-10-03T20:29:03"))
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
                .andExpect(jsonPath("$.user.id").value(2L))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.poll.pollChoices[0].id").value(9))
                .andExpect(jsonPath("$.poll.pollChoices[0].votedUser[0].id").value(2))
                .andExpect(jsonPath("$.poll.pollChoices[1].id").value(10))
                .andExpect(jsonPath("$.poll.pollChoices[1].votedUser[0].id").value(1))
                .andExpect(jsonPath("$.retweetsCount").value(1L))
                .andExpect(jsonPath("$.likedTweetsCount").value(1L))
                .andExpect(jsonPath("$.repliesCount").value(1L))
                .andExpect(jsonPath("$.isTweetLiked").value(false))
                .andExpect(jsonPath("$.isTweetRetweeted").value(false))
                .andExpect(jsonPath("$.isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$.isTweetDeleted").value(false))
                .andExpect(jsonPath("$.isTweetBookmarked").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/tweets/vote - Should poll Not Found")
    public void voteInPoll_ShouldPollNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(99L);
        voteRequest.setPollChoiceId(3L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/vote")
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Poll not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/tweets/vote - Should poll choice Not Found")
    public void voteInPoll_ShouldPollChoiceNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(2L);
        voteRequest.setPollChoiceId(99L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/vote")
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Poll choice not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/tweets/vote - Should tweet Not Found")
    public void voteInPoll_ShouldTweetNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(99L);
        voteRequest.setPollId(2L);
        voteRequest.setPollChoiceId(9L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/vote")
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/tweets/vote - Should poll in tweet Not Found")
    public void voteInPoll_ShouldPollInTweetNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(8L);
        voteRequest.setPollChoiceId(11L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/vote")
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Poll in tweet not exist")));
    }
}
