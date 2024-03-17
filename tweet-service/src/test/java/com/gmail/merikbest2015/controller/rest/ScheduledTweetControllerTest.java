package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.TweetDeleteRequest;
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

import java.time.LocalDateTime;
import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.INCORRECT_TWEET_TEXT_LENGTH;
import static com.gmail.merikbest2015.constants.ErrorMessage.TWEET_NOT_FOUND;
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
public class ScheduledTweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/schedule - Get scheduled tweets")
    public void getScheduledTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
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
    @DisplayName("[200] POST /ui/v1/tweets/schedule - Create Scheduled Tweet")
    public void createScheduledTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet");
        tweetRequest.setReplyType(ReplyType.EVERYONE);
        tweetRequest.setScheduledDate(LocalDateTime.parse(TestConstants.TWEET_SCHEDULED_DATETIME));

        mockMvc.perform(post(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").value(TestConstants.TWEET_SCHEDULED_DATETIME))
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
    @DisplayName("[200] PUT /ui/v1/tweets/schedule - Update Scheduled Tweet")
    public void updateScheduledTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText("test tweet2");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(39L))
                .andExpect(jsonPath("$.text").value("test tweet2"))
                .andExpect(jsonPath("$.dateTime").isNotEmpty())
                .andExpect(jsonPath("$.scheduledDate").value(TestConstants.TWEET_SCHEDULED_DATETIME))
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
    @DisplayName("[400] PUT /ui/v1/tweets/schedule - Should tweet text length length is 0")
    public void updateScheduledTweet_ShouldTweetTextLengthLengthIs0() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText("");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_TWEET_TEXT_LENGTH)));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/tweets/schedule - Should tweet text length more than 280 symbols")
    public void updateScheduledTweet_ShouldTweetTextLengthMoreThan280Symbols() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(39L);
        tweetRequest.setText(TestConstants.LINK_DESCRIPTION + TestConstants.LINK_DESCRIPTION);
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_TWEET_TEXT_LENGTH)));
    }

    @Test
    @DisplayName("[404] PUT /ui/v1/tweets/schedule - Should Tweet Not Found")
    public void updateScheduledTweet_ShouldTweetNotFound() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setId(99L);
        tweetRequest.setText("test tweet99");
        tweetRequest.setReplyType(ReplyType.EVERYONE);

        mockMvc.perform(put(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] DELETE /ui/v1/tweets/schedule - Delete scheduled Tweets")
    public void deleteScheduledTweets() throws Exception {
        TweetDeleteRequest tweetDeleteRequest = new TweetDeleteRequest();
        tweetDeleteRequest.setTweetsIds(List.of(42L));

        mockMvc.perform(delete(UI_V1_TWEETS + SCHEDULE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(tweetDeleteRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Scheduled tweets deleted.")));
    }
}
