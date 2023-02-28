package com.gmail.merikbest2015.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
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

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_USER;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;
import static com.gmail.merikbest2015.util.TestConstants.*;
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
@Sql(value = {"/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class UserApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] GET /api/v1/user/ids - Get user followers ids")
    public void getUserFollowersIds() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/ids")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(1, 4, 2))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/search/MrCat - Search Users By Username")
    public void searchUsersByUsername() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/search/MrCat")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[*]", hasSize(6)))
                .andExpect(jsonPath("$.items[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$.items[0].username").value(USERNAME))
                .andExpect(jsonPath("$.items[0].about").value(ABOUT))
                .andExpect(jsonPath("$.items[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.items[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$.items[0].isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.items[0].isUserBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.items[0].isFollower").value(false))
                .andExpect(jsonPath("$.items[0].isUserChatParticipant").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/subscribers/2 - Get subscribers by user id")
    public void getSubscribersByUserId() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/subscribers/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(1))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_followed/1 - Get is user follow by other user")
    public void isUserFollowByOtherUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/is_followed/1")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_private/1 - Get is user have private profile")
    public void isUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/is_private/1")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_blocked/2/1 - Get is user blocked")
    public void isUserBlocked() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/is_blocked/2/1")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_user_blocked/1 - Get is user blocked by my profile")
    public void isUserBlockedByMyProfile() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/is_user_blocked/1")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_my_profile_blocked/1 - Get is my profile blocked by user")
    public void isMyProfileBlockedByUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/is_my_profile_blocked/1")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/notification/2 - Increase notifications count")
    public void increaseNotificationsCount() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/notification/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/like/count/true - Update like count")
    public void updateLikeCount() throws Exception {
        mockMvc.perform(put(API_V1_USER + "/like/count/true")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/tweet/count/true - Update tweet count")
    public void updateTweetCount() throws Exception {
        mockMvc.perform(put(API_V1_USER + "/tweet/count/true")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/media/count/true - Update media tweet count")
    public void updateMediaTweetCount() throws Exception {
        mockMvc.perform(put(API_V1_USER + "/media/count/true")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/list/owner/2 - Get list owner by id")
    public void getListOwnerById() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/list/owner/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/list/participants - Get list participants by ids")
    public void getListParticipantsByIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + "/list/participants")
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$[0].username").value(USERNAME))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isMemberInList").value(false))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/list/participants/MrCat - Search list members by username")
    public void searchListMembersByUsername() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/list/participants/MrCat")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
                .andExpect(jsonPath("$[0].id").value(USER_ID))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$[0].username").value(USERNAME))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isMemberInList").value(false))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/notification/user/2 - Get Notification User")
    public void getNotificationUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/notification/user/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/tweet/author/2 - Get tweet author")
    public void getTweetAuthor() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/tweet/author/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isFollower").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/tweet/additional/info/2 - Get tweet additional info user")
    public void getTweetAdditionalInfoUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/tweet/additional/info/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.isFollower").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(false));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/tweet/liked - Get tweet liked users by ids")
    public void getTweetLikedUsersByIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + "/tweet/liked")
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$.items[0].id").value(USER_ID))
                .andExpect(jsonPath("$.items[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$.items[0].username").value(USERNAME))
                .andExpect(jsonPath("$.items[0].about").value(ABOUT))
                .andExpect(jsonPath("$.items[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.items[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$.items[0].isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.items[0].isUserBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.items[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/tweet/retweeted - Get retweeted users by tweet id")
    public void getRetweetedUsersByTweetId() throws Exception {
        mockMvc.perform(post(API_V1_USER + "/tweet/retweeted")
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$.items[0].id").value(USER_ID))
                .andExpect(jsonPath("$.items[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$.items[0].username").value(USERNAME))
                .andExpect(jsonPath("$.items[0].about").value(ABOUT))
                .andExpect(jsonPath("$.items[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.items[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$.items[0].isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.items[0].isUserBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.items[0].isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.items[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] PUT /api/v1/user/tweet/pinned/99 - Update pinned tweet id")
    public void updatePinnedTweetId() throws Exception {
        mockMvc.perform(put(API_V1_USER + "/tweet/pinned/99")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/tweet/pinned/2 - Get user pinned tweet id")
    public void getUserPinnedTweetId() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/tweet/pinned/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(40)));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/tweet/valid/ids/MrCat - Get valid tweet user ids")
    public void getValidTweetUserIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + "/tweet/valid/ids/MrCat")
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2, 4, 6, 7))));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/valid/ids - Get valid ids")
    public void getValidUserIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + "/valid/ids")
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/chat/participant/3 - Get chat participant")
    public void getChatParticipant() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/chat/participant/3")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/is_exists/1 - Is user exists")
    public void isUserExists() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/is_exists/1")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/2 - Get user by id")
    public void getUserById() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/chat/2 - Get chat tweet user")
    public void getChatTweetUser() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/chat/2")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1));
    }

    @Test
    @DisplayName("[200] POST /api/v1/user/chat/valid/ids - Validate chat users ids")
    public void validateChatUsersIds() throws Exception {
        mockMvc.perform(post(API_V1_USER + "/chat/valid/ids")
                        .content(mapper.writeValueAsString(new IdsRequest(List.of(2L, 3L))))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2, 3))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/subscribers - Get users which user subscribed")
    public void getUsersWhichUserSubscribed() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/subscribers")
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(2))
                .andExpect(jsonPath("$[0].username").value(USERNAME))
                .andExpect(jsonPath("$[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/subscribers/ids - Get user id which user subscribed")
    public void getUserIdsWhichUserSubscribed() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/subscribers/ids")
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2))));
    }

    @Test
    @DisplayName("[200] GET /api/v1/user/notification/reset - Reset notification count")
    public void resetNotificationCount() throws Exception {
        mockMvc.perform(get(API_V1_USER + "/notification/reset")
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk());
    }
}
