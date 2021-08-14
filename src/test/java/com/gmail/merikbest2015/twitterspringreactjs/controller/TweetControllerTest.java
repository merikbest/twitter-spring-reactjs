package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.twitterspringreactjs.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(8)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].dateTime").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedUsername").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedId").isNotEmpty())
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getTweetById() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.text").value("first tweet"))
                .andExpect(jsonPath("$.dateTime").value("2021-08-09T00:09:35"))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.user").isNotEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getMediaTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/media"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].dateTime").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedUsername").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedId").isNotEmpty())
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void createTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test tweet");

        mockMvc.perform(post(URL_TWEETS_BASIC)
                .content(mapper.writeValueAsString(tweetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.text").value("test tweet"))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.user").isNotEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void searchTweets() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/search/first tweet"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].dateTime").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedUsername").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedId").isNotEmpty())
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void likeTweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/like/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.text").value("first tweet"))
                .andExpect(jsonPath("$.dateTime").value("2021-08-09T00:09:35"))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.user").isNotEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void retweet() throws Exception {
        mockMvc.perform(get(URL_TWEETS_BASIC + "/retweet/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.text").value("first tweet"))
                .andExpect(jsonPath("$.dateTime").value("2021-08-09T00:09:35"))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.user").isNotEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isNotEmpty())
                .andExpect(jsonPath("$.replies").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void replyTweet() throws Exception {
        TweetRequest tweetRequest = new TweetRequest();
        tweetRequest.setText("test reply");

        mockMvc.perform(post(URL_TWEETS_BASIC + "/reply/10")
                .content(mapper.writeValueAsString(tweetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.text").value("first tweet"))
                .andExpect(jsonPath("$.addressedUsername").isEmpty())
                .andExpect(jsonPath("$.addressedId").isEmpty())
                .andExpect(jsonPath("$.user").isNotEmpty())
                .andExpect(jsonPath("$.images").isEmpty())
                .andExpect(jsonPath("$.likedTweets").isNotEmpty())
                .andExpect(jsonPath("$.retweets").isEmpty())
                .andExpect(jsonPath("$.replies[0].text").value("test reply"));
    }
}
