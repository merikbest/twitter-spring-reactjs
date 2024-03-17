package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.constants.PathConstants.*;
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
@Sql(value = {"/sql-test/clear-tweet-db.sql", "/sql-test/populate-tweet-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tweet-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class LikeTweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/liked/user/2 - Get user liked tweets by id")
    public void getUserLikedTweets() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKED_USER_USER_ID,  TestConstants.USER_ID)
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
    @DisplayName("[404] GET /ui/v1/tweets/liked/user/99 - Should user Not Found by id")
    public void getUserLikedTweets_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKED_USER_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/liked/user/3 - Should user have private profile")
    public void getUserLikedTweets_ShouldUseHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKED_USER_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/liked/user/6 - Should user profile blocked")
    public void getUserLikedTweets_ShouldUseProfileBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKED_USER_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/40/liked-users - Get Liked Users By Tweet Id")
    public void getLikedUsersByTweetId() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_LIKED_USERS, 40)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
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
    @DisplayName("[404] GET /ui/v1/tweets/99/liked-users - Should Tweet Not Found by id")
    public void getLikedUsersByTweetId_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_LIKED_USERS, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/49/liked-users - Should Tweet deleted")
    public void getLikedUsersByTweetId_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + TWEET_ID_LIKED_USERS, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/like/2/43 - Like tweet by id")
    public void likeTweet() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKE_USER_ID_TWEET_ID, 2, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(43))
                .andExpect(jsonPath("$.text").value(TestConstants.TWEET_TEXT))
                .andExpect(jsonPath("$.authorId").value(2))
                .andExpect(jsonPath("$.notificationCondition").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/tweets/like/2/45 - Unlike tweet by id")
    public void unlikeTweet() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKE_USER_ID_TWEET_ID, 2, 45)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(45))
                .andExpect(jsonPath("$.text").value("media tweet test"))
                .andExpect(jsonPath("$.authorId").value(1))
                .andExpect(jsonPath("$.notificationCondition").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/tweets/like/2/99 - Should Tweet Not Found by id")
    public void likeTweet_ShouldTweetNotFoundById() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKE_USER_ID_TWEET_ID, 2, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/tweets/like/2/49 - Should Tweet deleted")
    public void likeTweet_ShouldTweetDeleted() throws Exception {
        mockMvc.perform(get(UI_V1_TWEETS + LIKE_USER_ID_TWEET_ID, 2, 49)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(TWEET_DELETED)));
    }
}
