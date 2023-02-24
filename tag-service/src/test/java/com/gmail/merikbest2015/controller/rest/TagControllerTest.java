package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.enums.ReplyType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_TAGS;
import static com.gmail.merikbest2015.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/populate-tag-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tag-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class TagControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/tags - Get all tags")
    public void getTags() throws Exception {
        mockMvc.perform(get(UI_V1_TAGS)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].tagName").isNotEmpty())
                .andExpect(jsonPath("$[*].tweetsQuantity").isNotEmpty());
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tags/trends - Get trends")
    public void getTrends() throws Exception {
        mockMvc.perform(get(UI_V1_TAGS + "/trends")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].tagName").isNotEmpty())
                .andExpect(jsonPath("$[*].tweetsQuantity").isNotEmpty());
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tags/search?tagName=#JetBrains - Get tweets by hashtag")
    public void getTweetsByTag() throws Exception {
        mockMvc.perform(get(UI_V1_TAGS + "/search")
                        .param("tagName", "#JetBrains")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(43L))
                .andExpect(jsonPath("$[0].text").value(TWEET_TEXT))
                .andExpect(jsonPath("$[0].dateTime").value(TWEET_DATETIME))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").value(LINK))
                .andExpect(jsonPath("$[0].linkTitle").value(LINK_TITLE))
                .andExpect(jsonPath("$[0].linkDescription").value(LINK_DESCRIPTION))
                .andExpect(jsonPath("$[0].linkCover").value(LINK_COVER))
                .andExpect(jsonPath("$[0].linkCoverSize").value("LARGE"))
                .andExpect(jsonPath("$[0].user.id").value(2L))
                .andExpect(jsonPath("$[0].images").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(0L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }
}
