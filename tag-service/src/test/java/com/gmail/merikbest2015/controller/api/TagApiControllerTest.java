package com.gmail.merikbest2015.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import com.gmail.merikbest2015.model.Tag;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-tag-db.sql", "/sql-test/populate-tag-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-tag-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class TagApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private TagRepository tagRepository;

    @Test
    @DisplayName("[200] GET /api/v1/tags/search/test - Get tags by text")
    public void getTagsByText() throws Exception {
        mockMvc.perform(get(API_V1_TAGS + SEARCH_TEXT, "test")
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0]").value("#test"));
    }

    @Test
    @DisplayName("[200] GET /api/v1/tags/parse/99 - Parse new hashtag in text")
    public void parseHashtagsInText_addNewHashtag() throws Exception {
        String hashtag = "#test_tag";
        mockMvc.perform(post(API_V1_TAGS + PARSE_TWEET_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                    .content(mapper.writeValueAsString(new TweetTextRequest(hashtag)))
                    .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        assertFindByTagName(hashtag, 1L);
    }

    @Test
    @DisplayName("[200] GET /api/v1/tags/parse/99 - Parse existing hashtags in text")
    public void parseHashtagsInText_addExistingHashtag() throws Exception {
        String hashtag = "#test";
        mockMvc.perform(post(API_V1_TAGS + PARSE_TWEET_ID, 99)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID)
                        .content(mapper.writeValueAsString(new TweetTextRequest(hashtag)))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        assertFindByTagName(hashtag, 2L);
    }

    @Test
    @DisplayName("[200] GET /api/v1/tags/delete/40 - Delete hashtag")
    public void deleteTagsByTweetId() throws Exception {
        mockMvc.perform(delete(API_V1_TAGS + DELETE_TWEET_ID, 40)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[200] GET /api/v1/tags/delete/43 - Delete hashtag and update Tag Quantity")
    public void deleteTagsByTweetId_updateTweetQuantity() throws Exception {
        mockMvc.perform(delete(API_V1_TAGS + DELETE_TWEET_ID, 43)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk());
    }

    private void assertFindByTagName(String hashtag, Long tweetQuantity) {
        Tag tag = tagRepository.findByTagName(hashtag).get();
        Assertions.assertEquals(hashtag, tag.getTagName());
        Assertions.assertEquals(tweetQuantity, tag.getTweetsQuantity());
    }
}
