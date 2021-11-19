package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
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
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    public void getUserChats() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].participants").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void createChat() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/create/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.participants").isNotEmpty())
                .andExpect(jsonPath("$.participants[1].id").value(3));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
    public void readChatMessages() throws Exception {
        mockMvc.perform(get(URL_CHAT_BASIC + "/8/read/messages"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
    public void addMessageWithTweet() throws Exception {
        Tweet tweet = new Tweet();
        tweet.setId(40L);
        User user = new User();
        user.setId(2L);
        MessageWithTweetRequest request = new MessageWithTweetRequest();
        request.setText("test text");
        request.setTweet(tweet);
        request.setUsers(Collections.singletonList(user));

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
}
