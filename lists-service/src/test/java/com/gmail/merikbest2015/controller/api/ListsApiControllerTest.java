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

import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-lists-db.sql", "/sql-test/populate-lists-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = "/sql-test/clear-lists-db.sql", executionPhase = AFTER_TEST_METHOD)
public class ListsApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /api/v1/lists/4 - Get Notification List")
    public void getNotificationList() throws Exception {
        mockMvc.perform(get(API_V1_LISTS + LIST_ID, 4)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.listName").value(TestConstants.LIST_NAME));
    }

    @Test
    @DisplayName("[200] GET /api/v1/lists/tweet/4 - Get tweet list by id")
    public void getTweetList() throws Exception {
        mockMvc.perform(get(API_V1_LISTS + TWEET_LIST_ID, 4)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.listName").value(TestConstants.LIST_NAME))
                .andExpect(jsonPath("$.altWallpaper").value(TestConstants.LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(TestConstants.LIST_USER_ID))
                .andExpect(jsonPath("$.membersSize").value(1L))
                .andExpect(jsonPath("$.isPrivate").value(false));
    }
}
