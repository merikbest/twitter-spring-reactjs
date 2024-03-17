package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.request.VoteRequest;
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

import java.util.ArrayList;
import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-tweet-db.sql", "/sql-test/populate-tweet-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tweet-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class PollControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] POST /ui/v1/tweets/poll - Create tweet with poll")
    public void createTweetWithPoll() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("Choice 2");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(UI_V1_TWEETS + POLL)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value(TestConstants.TEST_TWEET_TEXT))
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
                .andExpect(jsonPath("$.poll.id").isNotEmpty())
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
    @DisplayName("[400] POST /ui/v1/tweets/poll - Should incorrect poll choices size is 1")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesSizeIs1() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(UI_V1_TWEETS + POLL)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_POLL_CHOICES)));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/tweets/poll - Should incorrect poll choices size is 5")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesSizeIs5() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("Choice 2");
        pollChoiceList.add("Choice 3");
        pollChoiceList.add("Choice 4");
        pollChoiceList.add("Choice 5");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(UI_V1_TWEETS + POLL)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_POLL_CHOICES)));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/tweets/poll - Should incorrect poll choices text length is 0")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesTextLengthIs0() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add("");
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(UI_V1_TWEETS + POLL)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_CHOICE_TEXT_LENGTH)));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/tweets/poll - Should incorrect poll choices text length more than 25")
    public void createTweetWithPoll_ShouldIncorrectPoolChoicesTextLengthMoreThan25() throws Exception {
        List<String> pollChoiceList = new ArrayList<>();
        pollChoiceList.add("Choice 1");
        pollChoiceList.add(TestConstants.LINK_DESCRIPTION);
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText(TestConstants.TEST_TWEET_TEXT);
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setChoices(pollChoiceList);
        tweetRequest.setPollDateTime(100L);

        mockMvc.perform(post(UI_V1_TWEETS + POLL)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_CHOICE_TEXT_LENGTH)));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/tweets/vote - Vote in poll")
    public void voteInPoll() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(2L);
        voteRequest.setPollChoiceId(9L);

        mockMvc.perform(post(UI_V1_TWEETS + VOTE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
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
                .andExpect(jsonPath("$.author.id").value(2L))
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
    @DisplayName("[404] POST /ui/v1/tweets/vote - Should poll Not Found")
    public void voteInPoll_ShouldPollNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(99L);
        voteRequest.setPollChoiceId(3L);

        mockMvc.perform(post(UI_V1_TWEETS + VOTE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(POLL_NOT_FOUND)));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/tweets/vote - Should poll choice Not Found")
    public void voteInPoll_ShouldPollChoiceNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(2L);
        voteRequest.setPollChoiceId(99L);

        mockMvc.perform(post(UI_V1_TWEETS + VOTE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(POLL_CHOICE_NOT_FOUND)));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/tweets/vote - Should tweet Not Found")
    public void voteInPoll_ShouldTweetNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(99L);
        voteRequest.setPollId(2L);
        voteRequest.setPollChoiceId(9L);

        mockMvc.perform(post(UI_V1_TWEETS + VOTE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(POLL_NOT_FOUND)));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/tweets/vote - Should poll in tweet Not Found")
    public void voteInPoll_ShouldPollInTweetNotFound() throws Exception {
        VoteRequest voteRequest = new VoteRequest();
        voteRequest.setTweetId(40L);
        voteRequest.setPollId(8L);
        voteRequest.setPollChoiceId(11L);

        mockMvc.perform(post(UI_V1_TWEETS + VOTE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(voteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(POLL_NOT_FOUND)));
    }
}
