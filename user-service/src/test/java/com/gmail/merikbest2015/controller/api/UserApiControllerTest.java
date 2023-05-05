package com.gmail.merikbest2015.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
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
import static com.gmail.merikbest2015.constants.PathConstants.TWEET_COUNT;
import static com.gmail.merikbest2015.util.TestConstants.USERNAME;
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
public class UserApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] GET /api/v1/user/followers/ids - Get user followers ids")
    public void getUserFollowersIds() throws Exception {
        mockMvc.perform(get(API_V1_USER + FOLLOWERS_IDS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(1, 4, 2))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/search/MrCat - Search Users By Username")
    public void searchUsersByUsername() throws Exception {
        mockMvc.perform(get(API_V1_USER + SEARCH_USERNAME, TestConstants.USERNAME)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[*]", hasSize(6)))
                .andExpect(jsonPath("$.items[0].fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.items[0].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.items[0].about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.items[0].avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.items[0].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$.items[0].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$.items[0].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$.items[0].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$.items[0].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$.items[0].isFollower").isNotEmpty())
                .andExpect(jsonPath("$.items[0].isUserChatParticipant").isNotEmpty());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/subscribers/2 - Get subscribers by user id")
    public void getSubscribersByUserId() throws Exception {
        mockMvc.perform(get(API_V1_USER + SUBSCRIBERS_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(1))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_followed/1 - Get is user follow by other user")
    public void isUserFollowByOtherUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + IS_FOLLOWED_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_private/1 - Get is user have private profile")
    public void isUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(API_V1_USER + IS_PRIVATE_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_blocked/2/1 - Get is user blocked")
    public void isUserBlocked() throws Exception {
        mockMvc.perform(get(API_V1_USER + IS_BLOCKED_USER_ID, 2, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_user_blocked/1 - Get is user blocked by my profile")
    public void isUserBlockedByMyProfile() throws Exception {
        mockMvc.perform(get(API_V1_USER + IS_USER_BLOCKED_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_my_profile_blocked/1 - Get is my profile blocked by user")
    public void isMyProfileBlockedByUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + IS_MY_PROFILE_BLOCKED_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/notification/2 - Increase notifications count")
    public void increaseNotificationsCount() throws Exception {
        mockMvc.perform(get(API_V1_USER + NOTIFICATION_USER_ID, 2)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/mention/2 - Increase mentions count")
    public void increaseMentionsCount() throws Exception {
        mockMvc.perform(get(API_V1_USER + MENTION_USER_ID, 2)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/like/count/true - Update like count")
    public void updateLikeCount() throws Exception {
        mockMvc.perform(put(API_V1_USER + LIKE_COUNT, true)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/tweet/count/true - Update tweet count")
    public void updateTweetCount() throws Exception {
        mockMvc.perform(put(API_V1_USER + TWEET_COUNT, true)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/media/count/true - Update media tweet count")
    public void updateMediaTweetCount() throws Exception {
        mockMvc.perform(put(API_V1_USER + MEDIA_COUNT, true)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/list/owner/2 - Get list owner by id")
    public void getListOwnerById() throws Exception {
        mockMvc.perform(get(API_V1_USER + LIST_OWNER_USER_ID, 2)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/list/participants - Get list participants by ids")
    public void getListParticipantsByIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + LIST_PARTICIPANTS)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$[0].avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isMemberInList").value(false))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/list/participants/MrCat - Search list members by username")
    public void searchListMembersByUsername() throws Exception {
        mockMvc.perform(get(API_V1_USER + LIST_PARTICIPANTS_USERNAME, USERNAME)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
                .andExpect(jsonPath("$[0].id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$[0].fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$[0].avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isMemberInList").value(false))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/notification/user/2 - Get Notification User")
    public void getNotificationUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + NOTIFICATION_USER_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/tweet/author/2 - Get tweet author")
    public void getTweetAuthor() throws Exception {
        mockMvc.perform(get(API_V1_USER + TWEET_AUTHOR_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.email").value(TestConstants.USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isFollower").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/tweet/additional/info/2 - Get tweet additional info user")
    public void getTweetAdditionalInfoUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + TWEET_ADDITIONAL_INFO_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.isFollower").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(false));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/ids - Get tweet users by ids")
    public void getTweetLikedUsersByIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + IDS)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$.items[0].id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.items[0].fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.items[0].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.items[0].about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.items[0].avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.items[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$.items[0].isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.items[0].isUserBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.items[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/tagged/image - Get tagged image users")
    public void getTaggedImageUsers() throws Exception {
        mockMvc.perform(post(API_V1_USER + TAGGED_IMAGE)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$[0].fullName").value(TestConstants.USERNAME));
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/tweet/pinned/99 - Update pinned tweet id")
    public void updatePinnedTweetId() throws Exception {
        mockMvc.perform(put(API_V1_USER + TWEET_PINNED_TWEET_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/tweet/pinned/2 - Get user pinned tweet id")
    public void getUserPinnedTweetId() throws Exception {
        mockMvc.perform(get(API_V1_USER + TWEET_PINNED_USER_ID, 2)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(40)));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/tweet/valid/ids/MrCat - Get valid tweet user ids")
    public void getValidTweetUserIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + TWEET_VALID_IDS, USERNAME)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2, 4, 6, 7))));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/valid/ids - Get valid ids")
    public void getValidUserIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + VALID_IDS)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/chat/participant/3 - Get chat participant")
    public void getChatParticipant() throws Exception {
        mockMvc.perform(get(API_V1_USER + CHAT_PARTICIPANT_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_exists/1 - Is user exists")
    public void isUserExists() throws Exception {
        mockMvc.perform(get(API_V1_USER + IS_EXISTS_USER_ID, 1)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/2 - Get user by id")
    public void getUserById() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/2")
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/id/@John_Doe - Get user id by username")
    public void getUserIdByUsername() throws Exception {
        mockMvc.perform(get(API_V1_USER + USER_ID_USERNAME, "@John_Doe")
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(1L));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/chat/2 - Get chat tweet user")
    public void getChatTweetUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + CHAT_USER_ID, TestConstants.USER_ID)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.avatar").value(TestConstants.AVATAR_SRC_1));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/chat/valid/ids - Validate chat users ids")
    public void validateChatUsersIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + CHAT_VALID_IDS)
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2, 3))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/subscribers - Get users which user subscribed")
    public void getUsersWhichUserSubscribed() throws Exception {
        mockMvc.perform(get(API_V1_USER + SUBSCRIBERS)
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$[0].username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$[0].avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/subscribers/ids - Get user id which user subscribed")
    public void getUserIdsWhichUserSubscribed() throws Exception {
        mockMvc.perform(get(API_V1_USER + SUBSCRIBERS_IDS)
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/notification/reset - Reset notification count")
    public void resetNotificationCount() throws Exception {
        mockMvc.perform(get(API_V1_USER + NOTIFICATION_RESET)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/mention/reset - Reset mention count")
    public void resetMentionCount() throws Exception {
        mockMvc.perform(get(API_V1_USER + MENTION_RESET)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }
}
