package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
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
import java.util.Arrays;
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
    public void getTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(5)))
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
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getTweetById() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value(LinkCoverSize.LARGE.toString()))
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getMediaTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/media"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
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
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getTweetsWithVideo() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/video"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[0].id").value(42))
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].dateTime").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedUsername").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedId").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedTweetId").isNotEmpty())
                .andExpect(jsonPath("$[*].replyType").isNotEmpty())
                .andExpect(jsonPath("$[*].link").isNotEmpty())
                .andExpect(jsonPath("$[0].link").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[*].linkTitle").isNotEmpty())
                .andExpect(jsonPath("$[0].linkTitle").value(YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$[*].linkDescription").isNotEmpty())
                .andExpect(jsonPath("$[*].linkCover").isNotEmpty())
                .andExpect(jsonPath("$[0].linkCover").value(YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$[*].linkCoverSize").isNotEmpty())
                .andExpect(jsonPath("$[*].quoteTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getScheduledTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/schedule"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[0].id").value(39))
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
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value(LinkCoverSize.SMALL.toString()))
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void createTweetWithPoll() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("Choice 2");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test text");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/poll")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value("test text"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
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
                .andExpect(jsonPath("$.poll.pollChoices[0].choice").value("Choice 1"))
                .andExpect(jsonPath("$.poll.pollChoices[1].choice").value("Choice 2"))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void createScheduledTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setScheduledDate(LocalDateTime.parse(TWEET_SCHEDULED_DATETIME));

        mockMvc.perform(post(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
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
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateScheduledTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText("test tweet2");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(URL_TWEETS_BASIC + "/schedule")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(39))
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
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
    public void deleteTweet() throws Exception {
        mockMvc.perform(delete(URL_TWEETS_BASIC + "/40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(40))
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
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
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isNotEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void searchTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/search/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(4)))
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
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void likeTweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/like/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value(LinkCoverSize.LARGE.toString()))
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void unlikeTweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/like/45"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(45))
                .andExpect(jsonPath("$.text").value("media tweet test"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isEmpty())
                .andExpect(jsonPath("$.linkTitle").isEmpty())
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").isEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.images").isNotEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isNotEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void retweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/retweet/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value(LinkCoverSize.LARGE.toString()))
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isNotEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void unretweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/retweet/45"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(45))
                .andExpect(jsonPath("$.text").value("media tweet test"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isEmpty())
                .andExpect(jsonPath("$.linkTitle").isEmpty())
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").isEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.images").isNotEmpty())
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void replyTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/reply/43")
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value(LinkCoverSize.LARGE.toString()))
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isNotEmpty())
                .andExpect(jsonPath("$.replies[0].text").value("test reply"));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$.link").isEmpty())
                .andExpect(jsonPath("$.linkTitle").isEmpty())
                .andExpect(jsonPath("$.linkDescription").isEmpty())
                .andExpect(jsonPath("$.linkCover").isEmpty())
                .andExpect(jsonPath("$.linkCoverSize").isEmpty())
                .andExpect(jsonPath("$.quoteTweet").isNotEmpty())
                .andExpect(jsonPath("$.quoteTweet.id").value(43))
                .andExpect(jsonPath("$.quoteTweet.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.quoteTweet.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void changeTweetReplyType() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/reply/change/43")
                        .param("replyType", String.valueOf(ReplyType.FOLLOW)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.addressedTweetId").isEmpty())
                .andExpect(jsonPath("$.replyType").value(ReplyType.FOLLOW.toString()))
                .andExpect(jsonPath("$.link").value(LINK))
                .andExpect(jsonPath("$.linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$.linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$.linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$.linkCoverSize").value(LinkCoverSize.LARGE.toString()))
                .andExpect(jsonPath("$.quoteTweet").isEmpty())
                .andExpect(jsonPath("$.user.id").value(2))
                .andExpect(jsonPath("$.poll").isEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void voteInPoll() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollChoiceId(3L);

        mockMvc.perform(post(URL_TWEETS_BASIC + "/vote")
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(40))
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
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
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isNotEmpty())
                .andExpect(jsonPath("$.replies").isNotEmpty());
    }
}
