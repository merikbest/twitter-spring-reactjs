package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-user-db.sql", "/sql-test/populate-user-db.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class UserApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /api/v1/user/2 - Get user by id")
    public void getUserById() throws Exception {
        mockMvc.perform(get(PathConstants.API_V1_USER + "/2")
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
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
        mockMvc.perform(get(PathConstants.API_V1_USER + PathConstants.SUBSCRIBERS)
                        .header(PathConstants.AUTH_USER_ID_HEADER, 1L))
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
        mockMvc.perform(get(PathConstants.API_V1_USER + PathConstants.SUBSCRIBERS_IDS)
                        .header(PathConstants.AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(List.of(2))));
    }
}
