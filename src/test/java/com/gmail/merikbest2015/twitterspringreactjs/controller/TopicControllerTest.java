package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SuggestedTopicsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TopicsCategoriesRequest;
import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
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

import java.util.Arrays;

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
public class TopicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/topics/suggested - Get topics by ids")
    public void getTopicsByIds() throws Exception {
        SuggestedTopicsRequest topicsRequest = new SuggestedTopicsRequest();
        topicsRequest.setTopicsIds(Arrays.asList(1001L, 1002L, 1003L, 1004L, 1005L, 1006L, 1007L, 1008L, 1009L, 1010L));

        mockMvc.perform(post(URL_TOPICS_BASIC + "/suggested")
                        .content(mapper.writeValueAsString(topicsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(10)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/topics/category - Get topics by categories")
    public void getTopicsByCategories() throws Exception {
        TopicsCategoriesRequest topicsRequest = new TopicsCategoriesRequest();
        topicsRequest.setCategories(Arrays.asList(TopicCategory.ONLY_ON_TWITTER, TopicCategory.GAMING));

        mockMvc.perform(post(URL_TOPICS_BASIC + "/category")
                        .content(mapper.writeValueAsString(topicsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].topicsByCategories[*]", hasSize(8)))
                .andExpect(jsonPath("$[0].topicsByCategories[0].topicCategory").value(TopicCategory.ONLY_ON_TWITTER.toString()))
                .andExpect(jsonPath("$[1].topicsByCategories[*]", hasSize(8)))
                .andExpect(jsonPath("$[1].topicsByCategories[0].topicCategory").value(TopicCategory.GAMING.toString()));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/followed - Get followed topics")
    public void getFollowedTopics() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/followed"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(4)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/followed/1 - Get followed topics by user id")
    public void getFollowedTopicsByUserId() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/followed/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/not_interested - Get not interested topics")
    public void getNotInterestedTopics() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/not_interested"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/not_interested/1001 - Add not interested topic")
    public void processNotInterestedTopic_addTopic() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/not_interested/1001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/not_interested/1018 - Remove not interested topic")
    public void processNotInterestedTopic_removeTopic() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/not_interested/1018"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/not_interested/1 - Should topic not found")
    public void processNotInterestedTopic_NotFound() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/not_interested/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Topic not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/follow/1001 - Follow topic")
    public void processFollowTopic_followTopic() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/follow/1001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/follow/1008 - Unfollow topic")
    public void processFollowTopic_unfollowTopic() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/follow/1008"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/topics/follow/1 - Should topic not found")
    public void processFollowTopic_NotFound() throws Exception {
        mockMvc.perform(get(URL_TOPICS_BASIC + "/follow/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Topic not found")));
    }
}
