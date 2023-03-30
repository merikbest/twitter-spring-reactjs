package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.enums.NotificationType;
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
@Sql(value = {"/sql-test/clear-notification-db.sql", "/sql-test/populate-notification-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-notification-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/notification/user - Get user notifications")
    public void getUserNotifications() throws Exception {
        mockMvc.perform(get(UI_V1_NOTIFICATION + USER)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/notification/mentions - Get user mentions notifications")
    public void getUserMentionsNotifications() throws Exception {
        mockMvc.perform(get(UI_V1_NOTIFICATION + MENTIONS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/notification/subscribes - Get tweet authors notifications")
    public void getTweetAuthorsNotifications() throws Exception {
        mockMvc.perform(get(UI_V1_NOTIFICATION + SUBSCRIBES)
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/notification/37 - Get user notification by id")
    public void getUserNotificationById() throws Exception {
        mockMvc.perform(get(UI_V1_NOTIFICATION + NOTIFICATION_ID, 37)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(37))
                .andExpect(jsonPath("$.date").value("2021-10-03T20:31:44"))
                .andExpect(jsonPath("$.notificationType").value(NotificationType.LIKE.toString()));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/notification/99 - Should notification not found")
    public void getUserNotificationById_ShouldNotificationNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_NOTIFICATION + NOTIFICATION_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Notification not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/notification/timeline - Get notifications from tweet authors")
    public void getNotificationsFromTweetAuthors() throws Exception {
        mockMvc.perform(get(UI_V1_NOTIFICATION + TIMELINE)
                        .header(AUTH_USER_ID_HEADER, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)));
    }
}
