package com.gmail.merikbest2015.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.dto.request.MessageWithTweetRequest;
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

import java.util.Collections;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-chat-db.sql", "/sql-test/populate-chat-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-chat-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class ChatMessageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] GET /ui/v1/chat/8/messages - Get chat messages by chat id")
    public void getChatMessages() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CHAT_ID_MESSAGES, 8)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[0].id").value(5L))
                .andExpect(jsonPath("$[0].text").value("hello from MrCat"))
                .andExpect(jsonPath("$[0].date").value("2021-10-03T20:39:55"))
                .andExpect(jsonPath("$[0].author.id").value(2L))
                .andExpect(jsonPath("$[0].tweet.id").value(40L));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/chat/99/messages - Should chat not found")
    public void getChatMessages_ShouldChatNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CHAT_ID_MESSAGES, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(CHAT_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/chat/8/read/messages - Read chat messages by chat id")
    public void readChatMessages() throws Exception {
        mockMvc.perform(get(UI_V1_CHAT + CHAT_ID_READ_MESSAGES, 8)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(0));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/chat/add/message - Add chat message")
    public void addMessage() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest(8L, TestConstants.TEST_TWEET_TEXT);
        mockMvc.perform(post(UI_V1_CHAT + ADD_MESSAGE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[404] POST /ui/v1/chat/add/message - Chat Not Found")
    public void addMessage_ChatNotFound() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest(9L, TestConstants.TEST_TWEET_TEXT);
        mockMvc.perform(post(UI_V1_CHAT + ADD_MESSAGE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(CHAT_NOT_FOUND)));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/chat/add/message - Chat Participant Is Blocked")
    public void addMessage_ChatParticipantIsBlocked() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest(10L, TestConstants.TEST_TWEET_TEXT);
        mockMvc.perform(post(UI_V1_CHAT + ADD_MESSAGE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(CHAT_PARTICIPANT_BLOCKED)));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/chat/add/message/tweet - Add message with Tweet")
    public void addMessageWithTweet() throws Exception {
        MessageWithTweetRequest request = new MessageWithTweetRequest(TestConstants.TEST_TWEET_TEXT, 40L, Collections.singletonList(2L));
        mockMvc.perform(post(UI_V1_CHAT + ADD_MESSAGE_TWEET)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[404] POST /ui/v1/chat/add/message/tweet - Should tweet not found")
    public void addMessageWithTweet_ShouldTweetNotFound() throws Exception {
        MessageWithTweetRequest request = new MessageWithTweetRequest(TestConstants.TEST_TWEET_TEXT, 99L, Collections.singletonList(2L));
        mockMvc.perform(post(UI_V1_CHAT + ADD_MESSAGE_TWEET)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(TWEET_NOT_FOUND)));
    }
}
