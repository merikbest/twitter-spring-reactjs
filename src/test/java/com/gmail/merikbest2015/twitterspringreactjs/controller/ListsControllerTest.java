package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.gmail.merikbest2015.twitterspringreactjs.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class ListsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists - Get all tweet lists")
    public void getAllTweetLists() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].name").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].private").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedDate").isNotEmpty())
                .andExpect(jsonPath("$[*].altWallpaper").isNotEmpty())
                .andExpect(jsonPath("$[*].listOwner").isNotEmpty())
                .andExpect(jsonPath("$[*].tweets").isNotEmpty())
                .andExpect(jsonPath("$[*].members").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty());
    }

    @Test
    @DisplayName("GET /api/v1/lists/user - Get user tweet lists")
    @WithUserDetails(USER_EMAIL)
    public void getUserTweetLists() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].name").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].private").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedDate").isNotEmpty())
                .andExpect(jsonPath("$[*].altWallpaper").isNotEmpty())
                .andExpect(jsonPath("$[*].listOwner").isNotEmpty())
                .andExpect(jsonPath("$[*].tweets").isNotEmpty())
                .andExpect(jsonPath("$[*].members").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/pined - Get user pinned tweet lists")
    public void getUserPinnedLists() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/pined"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].name").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].private").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedDate").isNotEmpty())
                .andExpect(jsonPath("$[*].altWallpaper").isNotEmpty())
                .andExpect(jsonPath("$[*].listOwner").isNotEmpty())
                .andExpect(jsonPath("$[*].tweets").isNotEmpty())
                .andExpect(jsonPath("$[*].members").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/4 - Get list by id")
    public void getListById() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.tweets").isNotEmpty())
                .andExpect(jsonPath("$.members").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/6 - Get owner private list by id")
    public void getOwnerPrivateListById() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/6"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(true))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/7 - Get followed private list by id")
    public void getFollowedPrivateListById() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(7))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(true))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(1L))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/8 - Not found existing private list by id")
    public void getPrivateListById_NotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/8"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/9 - Not found list by id")
    public void getListById_NotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/9"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("POST /api/v1/lists - Create Tweet List")
    public void createTweetList() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setName(LIST_NAME);
        listsRequest.setDescription(LIST_DESCRIPTION);
        listsRequest.setAltWallpaper(LIST_ALT_WALLPAPER);

        mockMvc.perform(post(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.pinnedDate").isEmpty())
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("PUT /api/v1/lists - Edit Tweet List")
    public void editTweetList() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setId(4L);
        listsRequest.setName("edited name");
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value("edited name"))
                .andExpect(jsonPath("$.description").value("edited description"))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.tweets").isNotEmpty())
                .andExpect(jsonPath("$.members").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/follow/5 - Follow list")
    public void followList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/follow/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(1))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/follow/5 - Unfollow list")
    public void unfollowList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/follow/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/pin/6 - Pin list")
    public void pinList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/pin/6"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").isEmpty())
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/pin/4 - Unpin list")
    public void unpinList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/pin/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").isEmpty())
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("POST /api/v1/lists/add/user - Add users to lists")
    public void addUserToLists() throws Exception {
        UserToListsRequest request = new UserToListsRequest();
        request.setUserId(1L);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(3L);
        ListsResponse listsResponse1 = new ListsResponse();
        listsResponse1.setId(4L);
        listsResponse1.setMembers(Collections.singletonList(userResponse));
        ListsResponse listsResponse2 = new ListsResponse();
        listsResponse2.setId(6L);
        listsResponse2.setMembers(new ArrayList<>());

        List<ListsResponse> listsResponses = new ArrayList<>();
        listsResponses.add(listsResponse1);
        listsResponses.add(listsResponse2);
        request.setLists(listsResponses);

        mockMvc.perform(post(URL_LISTS_BASIC + "/add/user")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].name").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].private").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedDate").isNotEmpty())
                .andExpect(jsonPath("$[*].altWallpaper").isNotEmpty())
                .andExpect(jsonPath("$[*].listOwner").isNotEmpty())
                .andExpect(jsonPath("$[*].tweets").isNotEmpty())
                .andExpect(jsonPath("$[*].members").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("POST /api/v1/lists/add/user/1/6 - Add user to list")
    public void addUserToList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/1/6"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isNotEmpty())
                .andExpect(jsonPath("$.members").isNotEmpty())
                .andExpect(jsonPath("$.followers").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("GET /api/v1/lists/add/user/1/4 - Remove user from list")
    public void removeUserFromList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/1/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(false))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty());
    }
}
