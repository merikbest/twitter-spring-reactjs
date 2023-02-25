package com.gmail.merikbest2015.controller.rest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_USER;
import static com.gmail.merikbest2015.util.TestConstants.*;
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
@Sql(value = {"/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class BlockUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/user/blocked - Get blocked users")
    public void getBlockList() throws Exception {
        mockMvc.perform(get(UI_V1_USER + "/blocked")
                .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(4L))
                .andExpect(jsonPath("$[0].fullName").value(FULL_NAME))
                .andExpect(jsonPath("$[0].username").value(FULL_NAME))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(true))
                .andExpect(jsonPath("$[0].isUserBlocked").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/blocked/3 - Add user to block list by id")
    public void addToBlockList() throws Exception {
        mockMvc.perform(get(UI_V1_USER + "/blocked/3")
                .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/user/blocked/4 - Remove user from block list by id")
    public void removeFromBlockList() throws Exception {
        mockMvc.perform(get(UI_V1_USER + "/blocked/4")
                .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/user/blocked/99 - Should user Not Found by id")
    public void processBlockList_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_USER + "/blocked/99")
                .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }
}
