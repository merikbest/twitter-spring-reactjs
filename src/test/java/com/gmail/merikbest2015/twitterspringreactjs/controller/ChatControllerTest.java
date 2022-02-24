package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static com.gmail.merikbest2015.twitterspringreactjs.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/users - Get user chats")
    public void getUserChats() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].participants").isNotEmpty())
                .andExpect(jsonPath("$[0].participants[0].user.id").value(1L))
                .andExpect(jsonPath("$[0].participants[1].user.id").value(2L));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/create/3 - Create chat with participant")
    public void createChat() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/create/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.participants").isNotEmpty())
                .andExpect(jsonPath("$.participants[*]", hasSize(2)))
                .andExpect(jsonPath("$.participants[0].user.id").value(2L))
                .andExpect(jsonPath("$.participants[1].user.id").value(3L));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/chat/create/111 - Should participant Not Found")
    public void createChat_ShouldParticipantNotFound() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/create/111"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Participant not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] GET /api/v1/chat/create/4 - Bad Request. Create chat with blocked user")
    public void createChat_BadRequest() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/create/4"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Participant is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/8/messages - Get chat messages by chat id")
    public void getChatMessages() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/8/messages"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].date").isNotEmpty())
                .andExpect(jsonPath("$[*].author").isNotEmpty())
                .andExpect(jsonPath("$[*].chat").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/chat/9/messages - Not found chat messages by chat id")
    public void getChatMessages_NotFound() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/9/messages"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Chat messages not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/8/read/messages - Read chat messages by chat id")
    public void readChatMessages() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/8/read/messages"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))// +
                .andExpect(jsonPath("$.phone").value(PHONE))// +
                .andExpect(jsonPath("$.country").value(COUNTRY))// +
                .andExpect(jsonPath("$.gender").value(GENDER))// +
                .andExpect(jsonPath("$.language").value(LANGUAGE))// +
                .andExpect(jsonPath("$.backgroundColor").value(BACKGROUND_COLOR))// +
                .andExpect(jsonPath("$.colorScheme").value(COLOR_SCHEME))// +
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))// +
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))// +
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(MEDIA_TWEET_COUNT))// +
                .andExpect(jsonPath("$.likeCount").value(LIKE_TWEET_COUNT))// +
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(PROFILE_CUSTOMIZED))
                .andExpect(jsonPath("$.profileStarted").value(PROFILE_STARTED))
                .andExpect(jsonPath("$.unreadMessages").isEmpty())
                .andExpect(jsonPath("$.userMutedList").isNotEmpty())// +
                .andExpect(jsonPath("$.userBlockedList").isNotEmpty())// +
                .andExpect(jsonPath("$.subscribers").isNotEmpty())// +
                .andExpect(jsonPath("$.followerRequests").isEmpty())// +
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/chat/add/message - Add chat message")
    public void addMessage() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest();
        request.setChatId(8L);
        request.setText("test text");

        mockMvc.perform(post(URL_CHAT_BASIC + "/add/message")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("test text"))
                .andExpect(jsonPath("$.date").isNotEmpty())
                .andExpect(jsonPath("$.author.id").value(2))
                .andExpect(jsonPath("$.chat.id").value(8));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/chat/add/message - Chat Not Found")
    public void addMessage_ChatNotFound() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest();
        request.setChatId(9L);
        request.setText("test text");

        mockMvc.perform(post(URL_CHAT_BASIC + "/add/message")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Chat not found")));
    }

    @Test
    @WithUserDetails("test2017@test.test")
    @DisplayName("[404] POST /api/v1/chat/add/message - Chat Participant Not Found")
    public void addMessage_ChatParticipantNotFound() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest();
        request.setChatId(8L);
        request.setText("test text");

        mockMvc.perform(post(URL_CHAT_BASIC + "/add/message")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Chat participant not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/chat/add/message - Chat Participant Is Blocked")
    public void addMessage_ChatParticipantIsBlocked() throws Exception {
        ChatMessageRequest request = new ChatMessageRequest();
        request.setChatId(10L);
        request.setText("test text");

        mockMvc.perform(post(URL_CHAT_BASIC + "/add/message")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Participant is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/chat/add/message/tweet - Add message with Tweet")
    public void addMessageWithTweet() throws Exception {
        Tweet tweet = new Tweet();
        tweet.setId(40L);
        User user = new User();
        user.setId(2L);
        MessageWithTweetRequest request = new MessageWithTweetRequest();
        request.setText("test text");
//        request.setTweet(tweet);
//        request.setUsers(Collections.singletonList(user));

        mockMvc.perform(post(URL_CHAT_BASIC + "/add/message/tweet")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].date").isNotEmpty())
                .andExpect(jsonPath("$[*].author.id").value(2))
                .andExpect(jsonPath("$[*].chat.id").value(8));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/participant/4/8 - Get chat participant")
    public void getParticipant() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/participant/4/8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.email").value("merikbest2015@gmail.com"))
                .andExpect(jsonPath("$.fullName").value("Vbhjckfd1"))
                .andExpect(jsonPath("$.username").value("Vbhjckfd1"))
                .andExpect(jsonPath("$.location").value("Kyiv"))
                .andExpect(jsonPath("$.about").value("Hello2"))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.language").value(LANGUAGE))
                .andExpect(jsonPath("$.backgroundColor").value(BACKGROUND_COLOR))
                .andExpect(jsonPath("$.colorScheme").value(COLOR_SCHEME))
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").isEmpty())
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(0))
                .andExpect(jsonPath("$.pinnedTweet").isEmpty())
                .andExpect(jsonPath("$.bookmarks").isEmpty())
                .andExpect(jsonPath("$.avatar.id").value(11L))
                .andExpect(jsonPath("$.wallpaper.id").value(22L))
                .andExpect(jsonPath("$.profileCustomized").value(PROFILE_CUSTOMIZED))
                .andExpect(jsonPath("$.profileStarted").value(PROFILE_STARTED))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.userMutedList").isEmpty())
                .andExpect(jsonPath("$.userBlockedList").isEmpty())
                .andExpect(jsonPath("$.subscribers").isEmpty())
                .andExpect(jsonPath("$.followerRequests").isEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/chat/participant/4/11 - Chat not created")
    public void getParticipant_ChatNotFound() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/participant/4/11"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Chat not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/chat/participant/5/8 - Participant Not Found in chat")
    public void getParticipant_ParticipantNotFound() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/participant/5/8"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Participant not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/leave/3/8 - Leave from conversation")
    public void leaveFromConversation() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/leave/3/8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Successfully left the chat")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/chat/leave/5/10 - Leave from conversation and delete chat")
    public void leaveFromConversationAndDeleteChat() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/leave/5/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Chat successfully deleted")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/chat/leave/10/10 - Participant not found")
    public void leaveFromConversation_ParticipantNotFound() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/leave/10/10"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Participant not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/chat/leave/2/9 - Chat not found")
    public void leaveFromConversation_ChatNotFound() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/leave/2/9"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Chat not found")));
    }
}
