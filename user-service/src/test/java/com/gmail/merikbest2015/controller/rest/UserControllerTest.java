package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.dto.request.UserRequest;
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
@Sql(value = {"/sql-test/clear-user-db.sql", "/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] GET /ui/v1/user/token - Get user by token")
    public void getUserByToken() throws Exception {
        mockMvc.perform(get(UI_V1_USER + TOKEN)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.user.email").value(TestConstants.USER_EMAIL))
                .andExpect(jsonPath("$.user.fullName").value(TestConstants.FULL_NAME))
                .andExpect(jsonPath("$.user.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.user.location").value(TestConstants.LOCATION))
                .andExpect(jsonPath("$.user.about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.user.website").value(TestConstants.WEBSITE))
                .andExpect(jsonPath("$.user.birthday").value(TestConstants.BIRTHDAY))
                .andExpect(jsonPath("$.user.registrationDate").value(TestConstants.REGISTRATION_DATE))
                .andExpect(jsonPath("$.user.tweetCount").value(TestConstants.TWEET_COUNT))
                .andExpect(jsonPath("$.user.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.user.wallpaper").value(TestConstants.WALLPAPER_SRC))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/1 - Get user by id")
    public void getUserById() throws Exception {
        mockMvc.perform(get(UI_V1_USER + USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME2))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME2))
                .andExpect(jsonPath("$.location").value("Kyiv"))
                .andExpect(jsonPath("$.about").value(TestConstants.ABOUT2))
                .andExpect(jsonPath("$.website").value(TestConstants.WEBSITE))
                .andExpect(jsonPath("$.country").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.birthday").isEmpty())
                .andExpect(jsonPath("$.registrationDate").value(TestConstants.REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TestConstants.TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(TestConstants.MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(TestConstants.LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_2))
                .andExpect(jsonPath("$.pinnedTweetId").isEmpty())
                .andExpect(jsonPath("$.followersSize").value(2L))
                .andExpect(jsonPath("$.followingSize").value(1L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(1)))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(true))
                .andExpect(jsonPath("$.isSubscriber").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/99 - Should user Not Found by id")
    public void getUserById_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/all - Get users")
    public void getUsers() throws Exception {
        mockMvc.perform(get(UI_V1_USER + ALL)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
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
    @DisplayName("[200] GET /ui/v1/user/relevant - Get relevant users")
    public void getRelevantUsers() throws Exception {
        mockMvc.perform(get(UI_V1_USER + RELEVANT)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(5)))
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
    @DisplayName("[200] GET /ui/v1/user/search/MrCat - Search users by username")
    public void searchUsersByUsername() throws Exception {
        mockMvc.perform(get(UI_V1_USER + SEARCH_USERNAME, TestConstants.USERNAME)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
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
    @DisplayName("[200] GET /ui/v1/user/items/search/test - Search users by username Not Found")
    public void searchUsersByUsername_NotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + SEARCH_USERNAME, "test")
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/search/MrCat - Search by text")
    public void searchByText() throws Exception {
        mockMvc.perform(get(UI_V1_USER + SEARCH_TEXT, TestConstants.USERNAME)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tweetCount").value(0L))
                .andExpect(jsonPath("$.tags[*]", hasSize(0)))
                .andExpect(jsonPath("$.users[*]", hasSize(6)));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/user/search/results - Get Search Results")
    public void getSearchResults() throws Exception {
        SearchTermsRequest request = new SearchTermsRequest();
        request.setUsers(List.of(1L, 2L));
        mockMvc.perform(post(UI_V1_USER + SEARCH_RESULTS)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[1].id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$[1].fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[1].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[1].avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$[1].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/start - Start use twitter")
    public void startUseTwitter() throws Exception {
        mockMvc.perform(get(UI_V1_USER + START)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/user - Update user profile")
    public void updateUserProfile() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setFullName("test");
        userRequest.setAbout("test");
        userRequest.setLocation("test");
        userRequest.setWebsite("test");
        mockMvc.perform(put(UI_V1_USER)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.email").value(TestConstants.USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value("test"))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.location").value("test"))
                .andExpect(jsonPath("$.about").value("test"))
                .andExpect(jsonPath("$.website").value("test"))
                .andExpect(jsonPath("$.countryCode").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.phone").value(TestConstants.PHONE))
                .andExpect(jsonPath("$.country").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.gender").value(TestConstants.GENDER))
                .andExpect(jsonPath("$.birthday").value(TestConstants.BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(TestConstants.REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TestConstants.TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(TestConstants.MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(TestConstants.LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.active").value(true))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.backgroundColor").value(TestConstants.BACKGROUND_COLOR))
                .andExpect(jsonPath("$.colorScheme").value(TestConstants.COLOR_SCHEME))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.wallpaper").value(TestConstants.WALLPAPER_SRC))
                .andExpect(jsonPath("$.pinnedTweetId").value(TestConstants.PINNED_TWEET_ID))
                .andExpect(jsonPath("$.followersSize").value(2L))
                .andExpect(jsonPath("$.followingSize").value(1L))
                .andExpect(jsonPath("$.followerRequestsSize").value(1L))
                .andExpect(jsonPath("$.unreadMessagesCount").value(1L))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/user - Should username length is 0")
    public void updateUserProfile_ShouldUsernameLengthIs0() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setFullName("");
        mockMvc.perform(put(UI_V1_USER)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_USERNAME_LENGTH)));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/user - Should username length more than 50")
    public void updateUserProfile_ShouldUsernameLengthMoreThan50() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setFullName(TestConstants.LINK_DESCRIPTION);
        mockMvc.perform(put(UI_V1_USER)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_USERNAME_LENGTH)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/subscribe/1 - Subscribe to notifications")
    public void subscribeToNotifications() throws Exception {
        mockMvc.perform(get(UI_V1_USER + SUBSCRIBE_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/subscribe/1 - Unsubscribe from notifications")
    public void unsubscribeToNotifications() throws Exception {
        mockMvc.perform(get(UI_V1_USER + "/subscribe/2")
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/subscribe/99 - Should user Not Found by id")
    public void processSubscribeToNotifications_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + SUBSCRIBE_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/subscribe/5 - Should user blocked by other user")
    public void processSubscribeToNotifications_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + SUBSCRIBE_USER_ID, 5)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/pin/tweet/43 - Pin tweet to profile by id")
    public void processPinTweet() throws Exception {
        mockMvc.perform(get(UI_V1_USER + PIN_TWEET_ID, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(43)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/pin/tweet/40 - Unpin tweet from profile by id")
    public void processUnpinTweet() throws Exception {
        mockMvc.perform(get(UI_V1_USER + PIN_TWEET_ID, 40)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(0)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/pin/tweet/99 - Should tweet Not Found by id")
    public void processPinTweet_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + PIN_TWEET_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/details/1 - Get user details by id")
    public void getUserDetails() throws Exception {
        mockMvc.perform(get(UI_V1_USER + DETAILS_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3L))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.followingSize").value(0L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(0)))
                .andExpect(jsonPath("$.isPrivateProfile").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(true))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/details/99 - Should user details Not Found by id")
    public void getUserDetails_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + DETAILS_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(String.format(USER_ID_NOT_FOUND, 99))));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/user/details/5 - Should user blocked by other user")
    public void getUserDetails_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(UI_V1_USER + DETAILS_USER_ID, 5)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(USER_PROFILE_BLOCKED)));
    }
}
