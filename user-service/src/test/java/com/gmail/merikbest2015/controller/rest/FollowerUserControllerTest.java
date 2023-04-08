package com.gmail.merikbest2015.controller.rest;

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
@Sql(value = {"/sql-test/clear-user-db.sql", "/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class FollowerUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/user/followers/1 - Get followers by user id")
    public void getFollowers() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWERS_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/followers/99 - Should user Not Found by id")
    public void getFollowers_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWERS_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/followers/3 - Should user have private profile")
    public void getFollowers_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWERS_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/followers/5 - Should user blocked by other user")
    public void getFollowers_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWERS_USER_ID, 5)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/following/4 - Get following by user id")
    public void getFollowing() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWING_USER_ID, 4)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/following/99 - Should user Not Found by id")
    public void getFollowing_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWING_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/following/3 -  Should user have private profile")
    public void getFollowing_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWING_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/following/6 - Should user blocked by other user")
    public void getFollowing_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWING_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follower-requests - Follow user by id")
    public void getFollowerRequests() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOWER_REQUESTS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(7L))
                .andExpect(jsonPath("$[0].fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$[0].avatar").value(TestConstants.AVATAR_SRC_1));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/7 - Follow user by id")
    public void processFollow() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_USER_ID, 7)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/1 - Unfollow user by id")
    public void processUnfollow() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/3 - Follow to user private profile by id")
    public void processFollowToPrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/follow/99 - Should user Not Found by id")
    public void processFollow_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/follow/6 - Should user blocked by other user")
    public void processFollow_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/overall/1 - Get overall followers if exist")
    public void overallFollowers_exist() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_OVERALL, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/overall/7 - Get overall followers if not exist")
    public void overallFollowers_NotExist() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_OVERALL, 7)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/follow/overall/99 - Should user Not Found by id")
    public void overallFollowers_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_OVERALL, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/follow/overall/3 - Should user have private profile")
    public void overallFollowers_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_OVERALL, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/follow/overall/6 - Should user blocked by other user")
    public void overallFollowers_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_OVERALL, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/private/4 - Follow request from private profile")
    public void followRequestToPrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_PRIVATE, 4)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4L))
                .andExpect(jsonPath("$.fullName").value(TestConstants.FULL_NAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.location").value(TestConstants.LOCATION))
                .andExpect(jsonPath("$.about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.website").value(TestConstants.WEBSITE))
                .andExpect(jsonPath("$.country").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.birthday").value(TestConstants.BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(TestConstants.REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TestConstants.TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(TestConstants.MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(TestConstants.LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.wallpaper").value(TestConstants.WALLPAPER_SRC))
                .andExpect(jsonPath("$.pinnedTweetId").isEmpty())
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.followingSize").value(2L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(0)))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(true))
                .andExpect(jsonPath("$.isUserMuted").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(true))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(true))
                .andExpect(jsonPath("$.isSubscriber").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/private/7 - Unfollow request to private profile")
    public void unfollowRequestToPrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_PRIVATE, 7)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(7L))
                .andExpect(jsonPath("$.fullName").value(TestConstants.FULL_NAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.location").value(TestConstants.LOCATION))
                .andExpect(jsonPath("$.about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.website").value(TestConstants.WEBSITE))
                .andExpect(jsonPath("$.country").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.birthday").value(TestConstants.BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(TestConstants.REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TestConstants.TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(TestConstants.MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(TestConstants.LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.wallpaper").value(TestConstants.WALLPAPER_SRC))
                .andExpect(jsonPath("$.pinnedTweetId").isEmpty())
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.followingSize").value(0L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(0)))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(false))
                .andExpect(jsonPath("$.isSubscriber").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/follow/private/99 - Should user Not Found by id")
    public void processFollowRequestToPrivateProfile_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_PRIVATE, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/follow/private/6 -  Should user blocked by other user")
    public void processFollowRequestToPrivateProfile_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_PRIVATE, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/accept/2 - Accept follow request")
    public void acceptFollowRequest() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_ACCEPT, 2)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("User (id:2) accepted."));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/follow/accept/99 - Should user Not Found by id")
    public void acceptFollowRequest_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_ACCEPT, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/follow/decline/2 - Decline follow request")
    public void declineFollowRequest() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_DECLINE, 2)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("User (id:2) declined."));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/follow/decline/99 - Should user Not Found by id")
    public void declineFollowRequest_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + FOLLOW_DECLINE, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }
}
