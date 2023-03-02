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
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_TWEETS;
import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/populate-tweet-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tweet-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/user/bookmarks - Get user bookmarks")
    public void getUserBookmarks() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + "/user/bookmarks")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(40L))
                .andExpect(jsonPath("$[0].text").value("test tweet"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:29:03"))
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
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images", hasSize(1)))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(1L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/user/bookmarks/43 - Add tweet to bookmarks")
    public void processUserBookmarks_addBookmark() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + "/user/bookmarks/43")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/user/bookmarks/40 - Remove tweet from bookmarks")
    public void processUserBookmarks_removeBookmark() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + "/user/bookmarks/40")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/user/bookmarks/99 - Should Tweet Not Found")
    public void processUserBookmarks_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + "/user/bookmarks/99")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/user/bookmarks/49 - Should Tweet deleted")
    public void processUserBookmarks_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + "/user/bookmarks/49")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Sorry, that Tweet has been deleted.")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/43/bookmarked - Get is tweet bookmarked")
    public void getIsTweetBookmarked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + "/43/bookmarked")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }
}
