package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.util.ListsRequest;
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

    private UserToListsRequest userToListsRequest;

    public void createUserToList(Long userId) {
        userToListsRequest = new UserToListsRequest();
        userToListsRequest.setUserId(userId);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(3L);
        ListsRequest listsResponse1 = new ListsRequest();
        listsResponse1.setId(4L);
        listsResponse1.setMembers(Collections.singletonList(userResponse));
        ListsRequest listsResponse2 = new ListsRequest();
        listsResponse2.setId(6L);
        listsResponse2.setMembers(new ArrayList<>());

        List<ListsRequest> listsResponses = new ArrayList<>();
        listsResponses.add(listsResponse1);
        listsResponses.add(listsResponse2);
//        userToListsRequest.setLists(listsResponses); // TODO fix
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/lists - Get all tweet lists")
    public void getAllTweetLists() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
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
    @DisplayName("[200] GET /api/v1/lists/user - Get user tweet lists")
    @WithUserDetails(USER_EMAIL)
    public void getUserTweetLists() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
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
    @DisplayName("[200] GET /api/v1/lists/pined - Get user pinned tweet lists")
    public void getUserPinnedLists() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/pined"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
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
    @DisplayName("[200] GET /api/v1/lists/4 - Get list by id")
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
    @DisplayName("[200] GET /api/v1/lists/6 - Get owner private list by id")
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
    @DisplayName("[200] GET /api/v1/lists/7 - Get followed private list by id")
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
    @DisplayName("[404] GET /api/v1/lists/8 - Not found existing private list by id")
    public void getPrivateListById_NotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/8"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/lists/99 - Not found list by id")
    public void getListById_NotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/lists - Create Tweet List")
    public void createTweetList() throws Exception {
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
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
    @DisplayName("[400] POST /api/v1/lists - Should list name length is 0")
    public void createTweetList_ShouldListNameLengthIs0() throws Exception {
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
        listsRequest.setName("");
        listsRequest.setDescription(LIST_DESCRIPTION);
        listsRequest.setAltWallpaper(LIST_ALT_WALLPAPER);

        mockMvc.perform(post(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/lists - Should list name length more than 25 symbols")
    public void createTweetList_ShouldListNameLengthMoreThan25Symbols() throws Exception {
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
        listsRequest.setName(LINK_DESCRIPTION);
        listsRequest.setDescription(LIST_DESCRIPTION);
        listsRequest.setAltWallpaper(LIST_ALT_WALLPAPER);

        mockMvc.perform(post(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/lists - Edit Tweet List")
    public void editTweetList() throws Exception {
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
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
    @DisplayName("[400] PUT /api/v1/lists - Should list name length is 0")
    public void editTweetList_ShouldListNameLengthIs0() throws Exception {
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
        listsRequest.setId(4L);
        listsRequest.setName("");
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/lists - Should list name length more than 25 symbols")
    public void editTweetList_ShouldListNameLengthMoreThan25Symbols() throws Exception {
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
        listsRequest.setId(4L);
        listsRequest.setName(LINK_DESCRIPTION);
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] PUT /api/v1/lists - Should list Not Found")
    public void editTweetList_ShouldListNotFound() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(USER_ID);
//        userResponse.setEmail(USER_EMAIL);
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
        listsRequest.setListOwner(userResponse);
        listsRequest.setId(99L);
        listsRequest.setName(LIST_DESCRIPTION);
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] PUT /api/v1/lists - Should list owner Not Found")
    public void editTweetList_ShouldListOwnerNotFound() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(3L);
//        userResponse.setEmail(NOT_VALID_EMAIL);
        com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest listsRequest = new com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest();
        listsRequest.setListOwner(userResponse);
        listsRequest.setId(5L);
        listsRequest.setName(LIST_DESCRIPTION);
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(URL_LISTS_BASIC)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List owner not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/lists/follow/9 - Follow list")
    public void followList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/follow/9"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(9))
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
    @DisplayName("[404] GET /api/v1/lists/follow/99 - Should List Not Found by id")
    public void followList_ShouldListNotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/follow/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/lists/follow/8 - Should follow to private List Not Found by id")
    public void followList_ShouldFollowToPrivateListNotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/follow/8"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/lists/follow/4 - Unfollow list")
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
    @DisplayName("[200] GET /api/v1/lists/pin/6 - Pin list")
    public void pinList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/pin/6"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(true))
                .andExpect(jsonPath("$.pinnedDate").isEmpty())
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isEmpty())
                .andExpect(jsonPath("$.members").isEmpty())
                .andExpect(jsonPath("$.followers").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/lists/pin/8 - Should pinned list Not Found by id")
    public void pinList_ShouldPinnedListNotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/pin/8"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/lists/pin/4 - Unpin list")
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
    @DisplayName("[200] POST /api/v1/lists/add/user - Add users to lists")
    public void addUserToLists() throws Exception {
        createUserToList(1L);

        mockMvc.perform(post(URL_LISTS_BASIC + "/add/user")
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
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
    @DisplayName("[400] POST /api/v1/lists/add/user - Should user is blocked Add users to lists")
    public void addUserToLists_ShouldUserIsBlocked() throws Exception {
        createUserToList(4L);

        mockMvc.perform(post(URL_LISTS_BASIC + "/add/user")
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:4 is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/lists/add/user - Should user have a private profile")
    public void addUserToLists_ShouldUserHavePrivateProfile() throws Exception {
        createUserToList(3L);

        mockMvc.perform(post(URL_LISTS_BASIC + "/add/user")
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/lists/add/user - Should user blocked my profile")
    public void addUserToLists_ShouldUserBlockedMyProfile() throws Exception {
        createUserToList(6L);

        mockMvc.perform(post(URL_LISTS_BASIC + "/add/user")
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:2 is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/lists/add/user/1/6 - Add user to list")
    public void addUserToList() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/1/6"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.private").value(true))
                .andExpect(jsonPath("$.pinnedDate").value(LIST_PINNED_DATE))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.tweets").isNotEmpty())
                .andExpect(jsonPath("$.members").isNotEmpty())
                .andExpect(jsonPath("$.followers").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/lists/add/user/4/6 - Should user is blocked Add users to list")
    public void addUserToList_ShouldUserIsBlocked() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/4/6"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:4 is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/lists/add/user/3/6 - Should user have a private profile")
    public void addUserToList_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/3/6"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] POST /api/v1/lists/add/user/6/6 - Should user blocked my profile")
    public void addUserToList_ShouldUserBlockedMyProfile() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/6/6"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:2 is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] POST /api/v1/lists/add/user/7/99 - Should list Not Found")
    public void addUserToList_ShouldListNotFound() throws Exception {
        mockMvc.perform(get(URL_LISTS_BASIC + "/add/user/7/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/lists/add/user/1/4 - Remove user from list")
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
