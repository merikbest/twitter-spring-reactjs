package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.util.TestConstants;
import com.gmail.merikbest2015.constants.ChatErrorMessage;
import com.gmail.merikbest2015.constants.ChatSuccessMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-chat-db.sql", "/sql-test/populate-chat-db.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-chat-db.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class ChatParticipantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/chat/participant/4/8 - Get chat participant")
    public void getParticipant() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.PARTICIPANT_CHAT_ID, 1, 8)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.fullName").value(TestConstants.USERNAME2))
                .andExpect(jsonPath("$.username").value(TestConstants.USERNAME2))
                .andExpect(jsonPath("$.about").value(TestConstants.ABOUT2))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(true));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/participant/4/11 - Chat not created")
    public void getParticipant_ChatNotFound() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.PARTICIPANT_CHAT_ID, 4, 11)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(ChatErrorMessage.CHAT_NOT_FOUND)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/participant/5/8 - Participant Not Found in chat")
    public void getParticipant_ParticipantNotFound() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.PARTICIPANT_CHAT_ID, 5, 8)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(ChatErrorMessage.CHAT_PARTICIPANT_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/chat/leave/3/8 - Leave from conversation")
    public void leaveFromConversation() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.LEAVE_CHAT_ID, 2, 8)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(ChatSuccessMessage.SUCCESSFULLY_LEFT_THE_CHAT)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/chat/leave/5/10 - Leave from conversation and delete chat")
    public void leaveFromConversationAndDeleteChat() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.LEAVE_CHAT_ID, 2, 10)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(ChatSuccessMessage.CHAT_SUCCESSFULLY_DELETED)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/leave/10/10 - Participant not found")
    public void leaveFromConversation_ParticipantNotFound() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.LEAVE_CHAT_ID, 10, 10)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(ChatErrorMessage.CHAT_PARTICIPANT_NOT_FOUND)));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/leave/2/9 - Chat not found")
    public void leaveFromConversation_ChatNotFound() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_CHAT + PathConstants.LEAVE_CHAT_ID, 2, 9)
                        .header(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(ChatErrorMessage.CHAT_NOT_FOUND)));
    }
}
