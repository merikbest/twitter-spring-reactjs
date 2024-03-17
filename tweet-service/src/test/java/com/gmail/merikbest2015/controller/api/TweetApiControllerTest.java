package com.gmail.merikbest2015.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
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

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-tweet-db.sql", "/sql-test/populate-tweet-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tweet-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class TweetApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] POST /api/v1/tweets/ids - Get tweets by ids")
    public void getTweetsByIds() throws Exception {
        mockMvc.perform(post(API_V1_TWEETS + IDS)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(40L, 41L, 42L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)));
    }

    @Test
    @DisplayName("[200] POST /api/v1/tweets/user/ids - Get tweets by user ids")
    public void getTweetsByUserIds() throws Exception {
        mockMvc.perform(post(API_V1_TWEETS + USER_IDS)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[*]", hasSize(7)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/tweets/43 - Get tweet by id")
    public void getTweetById() throws Exception {
        mockMvc.perform(get(API_V1_TWEETS + TWEET_ID, 43)
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
    @DisplayName("[200] GET /api/v1/tweets/notification/43 - Get notification tweet")
    public void getNotificationTweet() throws Exception {
        mockMvc.perform(get(API_V1_TWEETS + NOTIFICATION_TWEET_ID, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.authorId").value(2))
                .andExpect(jsonPath("$.notificationCondition").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/tweets/id/43 - Is tweet exists")
    public void isTweetExists() throws Exception {
        mockMvc.perform(get(API_V1_TWEETS + ID_TWEET_ID, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @DisplayName("[200] GET /api/v1/tweets/count/test - Get tweet count by text")
    public void getTweetCountByText() throws Exception {
        mockMvc.perform(get(API_V1_TWEETS + COUNT_TEXT, "test")
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(4));
    }

    @Test
    @DisplayName("[200] GET /api/v1/tweets/chat/43 - Get chat tweet")
    public void getChatTweet() throws Exception {
        mockMvc.perform(get(API_V1_TWEETS + CHAT_TWEET_ID, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43L))
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.dateTime").value(TestConstants.TWEET_DATETIME))
                .andExpect(jsonPath("$.isDeleted").value(false))
                .andExpect(jsonPath("$.author.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.author.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.author.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.author.avatar").value(TestConstants.AVATAR_SRC_1));
    }
}
