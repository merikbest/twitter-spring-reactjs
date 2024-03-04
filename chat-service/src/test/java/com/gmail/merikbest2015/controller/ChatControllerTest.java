package com.gmail.merikbest2015.controller;

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
@Sql(value = {"/sql-test/clear-chat-db.sql", "/sql-test/populate-chat-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-chat-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/chat/1 - Get user chat")
    public void getChatById() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CHAT_ID, 8)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.creationDate").isNotEmpty())
                .andExpect(jsonPath("$.participants").isNotEmpty())
                .andExpect(jsonPath("$.participants[*]", hasSize(2)))
                .andExpect(jsonPath("$.participants[0].user.id").value(2L))
                .andExpect(jsonPath("$.participants[1].user.id").value(1L));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/1 - Should chat Not Found")
    public void getChatById_ShouldChatNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CHAT_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(CHAT_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/chat/users - Get user chats")
    public void getUserChats() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + USERS)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(8L))
                .andExpect(jsonPath("$[1].id").value(10L))
                .andExpect(jsonPath("$[*].participants").isNotEmpty())
                .andExpect(jsonPath("$[0].participants[0].user.id").value(2L))
                .andExpect(jsonPath("$[0].participants[1].user.id").value(1L));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/chat/create/3 - Create chat with participant")
    public void createChat() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CREATE_USER_ID, 3)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.creationDate").isNotEmpty())
                .andExpect(jsonPath("$.participants").isNotEmpty())
                .andExpect(jsonPath("$.participants[*]", hasSize(2)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/create/99 - Should participant Not Found")
    public void createChat_ShouldParticipantNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CREATE_USER_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(USER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/chat/create/6 - Bad Request. Create chat with blocked user")
    public void createChat_BadRequest() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CREATE_USER_ID, 6)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(CHAT_PARTICIPANT_BLOCKED)));
    }
}
