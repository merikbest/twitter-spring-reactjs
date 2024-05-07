package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.util.TestConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

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
public class UserApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
