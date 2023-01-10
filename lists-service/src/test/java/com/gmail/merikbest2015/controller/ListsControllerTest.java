package com.gmail.merikbest2015.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.commons.dto.UserResponse;
import com.gmail.merikbest2015.commons.enums.ReplyType;
import com.gmail.merikbest2015.dto.request.ListsRequest;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static com.gmail.merikbest2015.commons.controller.PathConstants.UI_V1_LISTS;
import static com.gmail.merikbest2015.commons.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.yml")
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
        userToListsRequest.setLists(Arrays.asList(
                new UserToListsRequest.ListsRequest(4L, true),
                new UserToListsRequest.ListsRequest(6L, true)
        ));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists - Get all tweet lists")
    public void getAllTweetLists() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[0].id").value(4L))
                .andExpect(jsonPath("$[0].name").value(LIST_NAME))
                .andExpect(jsonPath("$[0].description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$[0].altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$[0].wallpaper").isEmpty())
                .andExpect(jsonPath("$[0].listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/user - Get user tweet lists")
    public void getUserTweetLists() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/user")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[0].id").isNotEmpty())
                .andExpect(jsonPath("$[0].name").value(LIST_NAME))
                .andExpect(jsonPath("$[0].description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$[0].altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$[0].wallpaper").isEmpty())
                .andExpect(jsonPath("$[0].listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$[0].isPrivate").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/user/2 - Get user tweet lists by id")
    public void getUserTweetListsById() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/user/2")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(4L))
                .andExpect(jsonPath("$[0].name").value(LIST_NAME))
                .andExpect(jsonPath("$[0].description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$[0].altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$[0].wallpaper").isEmpty())
                .andExpect(jsonPath("$[0].listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$[0].isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/user/consist - Get tweet lists which user in")
    public void getTweetListsWhichUserIn() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/user/consist")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(7L))
                .andExpect(jsonPath("$[0].name").value(LIST_NAME))
                .andExpect(jsonPath("$[0].description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$[0].altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$[0].wallpaper").isEmpty())
                .andExpect(jsonPath("$[0].listOwner.id").value(1L))
                .andExpect(jsonPath("$[0].isFollower").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/pined - Get user pinned tweet lists")
    public void getUserPinnedLists() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/pined")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(4L))
                .andExpect(jsonPath("$[0].name").value(LIST_NAME))
                .andExpect(jsonPath("$[0].altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$[0].wallpaper").isEmpty())
                .andExpect(jsonPath("$[0].isPrivate").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/4 - Get list by id")
    public void getListById() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/4")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.membersSize").value(1L))
                .andExpect(jsonPath("$.followersSize").value(1L))
                .andExpect(jsonPath("$.isPrivate").value(false))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/6 - Get owner private list by id")
    public void getOwnerPrivateListById() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/6")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.membersSize").value(0L))
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.isPrivate").value(true))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/7 - Get followed private list by id")
    public void getFollowedPrivateListById() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/7")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(7))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(1L))
                .andExpect(jsonPath("$.membersSize").value(1L))
                .andExpect(jsonPath("$.followersSize").value(1L))
                .andExpect(jsonPath("$.isPrivate").value(true))
                .andExpect(jsonPath("$.isFollower").value(true));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/8 - Not found existing private list by id")
    public void getPrivateListById_NotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/8")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/99 - Not found list by id")
    public void getListById_NotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/99")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/lists - Create Tweet List")
    public void createTweetList() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(USER_ID);
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setName(LIST_NAME);
        listsRequest.setListOwner(userResponse);
        listsRequest.setDescription(LIST_DESCRIPTION);
        listsRequest.setAltWallpaper(LIST_ALT_WALLPAPER);

        mockMvc.perform(post(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.isPrivate").value(false));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/lists - Should list name length is 0")
    public void createTweetList_ShouldListNameLengthIs0() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setName("");
        listsRequest.setDescription(LIST_DESCRIPTION);
        listsRequest.setAltWallpaper(LIST_ALT_WALLPAPER);

        mockMvc.perform(post(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/lists - Should list name length more than 25 symbols")
    public void createTweetList_ShouldListNameLengthMoreThan25Symbols() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setName(LINK_DESCRIPTION);
        listsRequest.setDescription(LIST_DESCRIPTION);
        listsRequest.setAltWallpaper(LIST_ALT_WALLPAPER);

        mockMvc.perform(post(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/lists - Edit Tweet List")
    public void editTweetList() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setId(4L);
        listsRequest.setName("edited name");
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value("edited name"))
                .andExpect(jsonPath("$.description").value("edited description"))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.membersSize").value(1L))
                .andExpect(jsonPath("$.followersSize").value(1L))
                .andExpect(jsonPath("$.isPrivate").value(false))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/lists - Should list name length is 0")
    public void editTweetList_ShouldListNameLengthIs0() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setId(4L);
        listsRequest.setName("");
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/lists - Should list name length more than 25 symbols")
    public void editTweetList_ShouldListNameLengthMoreThan25Symbols() throws Exception {
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setId(4L);
        listsRequest.setName(LINK_DESCRIPTION);
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect list name length")));
    }

    @Test
    @DisplayName("[404] PUT /ui/v1/lists - Should list Not Found")
    public void editTweetList_ShouldListNotFound() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(USER_ID);
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setListOwner(userResponse);
        listsRequest.setId(99L);
        listsRequest.setName(LIST_DESCRIPTION);
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[404] PUT /ui/v1/lists - Should list owner Not Found")
    public void editTweetList_ShouldListOwnerNotFound() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(3L);
        ListsRequest listsRequest = new ListsRequest();
        listsRequest.setListOwner(userResponse);
        listsRequest.setId(5L);
        listsRequest.setName(LIST_DESCRIPTION);
        listsRequest.setDescription("edited description");

        mockMvc.perform(put(UI_V1_LISTS)
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(listsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List owner not found")));
    }

    @Test
    @DisplayName("[200] DELETE /ui/v1/lists/4 - Delete list")
    public void deleteList() throws Exception {
        mockMvc.perform(delete(UI_V1_LISTS + "/4")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("List id:4 deleted.")));
    }

    @Test
    @DisplayName("[404] DELETE /ui/v1/lists/99 - Delete list Should Not found")
    public void deleteList_ShouldNotFound() throws Exception {
        mockMvc.perform(delete(UI_V1_LISTS + "/99")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[400] DELETE /ui/v1/lists/5 - Delete another user list Should Not found")
    public void deleteAnotherUserList_ShouldNotFound() throws Exception {
        mockMvc.perform(delete(UI_V1_LISTS + "/5")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("List owner not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/follow/9 - Follow list")
    public void followList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/follow/9")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(9))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(1))
                .andExpect(jsonPath("$.isPrivate").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/follow/99 - Should List Not Found by id")
    public void followList_ShouldListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/follow/99")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/follow/8 - Should follow to private List Not Found by id")
    public void followList_ShouldFollowToPrivateListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/follow/8")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/follow/4 - Unfollow list")
    public void unfollowList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/follow/4")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(2))
                .andExpect(jsonPath("$.isPrivate").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/pin/6 - Pin list")
    public void pinList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/pin/6")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(6))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.isPrivate").value(true));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/pin/8 - Should pinned list Not Found by id")
    public void pinList_ShouldPinnedListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/pin/8")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/add/user/1 - Get lists to add user")
    public void getListsToAddUser() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/1")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].id", Matchers.oneOf(4, 6)))
                .andExpect(jsonPath("$[0].name").value(LIST_NAME))
                .andExpect(jsonPath("$[0].altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$[0].wallpaper").isEmpty())
                .andExpect(jsonPath("$[0].isMemberInList").value(false))
                .andExpect(jsonPath("$[0].isPrivate").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/pin/4 - Unpin list")
    public void unpinList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/pin/4")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.isPrivate").value(false));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/lists/add/user - Add users to lists")
    public void addUserToLists() throws Exception {
        createUserToList(1L);

        mockMvc.perform(post(UI_V1_LISTS + "/add/user")
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("User added to lists success."));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/lists/add/user - Should user is blocked Add users to lists")
    public void addUserToLists_ShouldUserIsBlocked() throws Exception {
        createUserToList(4L);

        mockMvc.perform(post(UI_V1_LISTS + "/add/user")
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:4 is blocked")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/lists/add/user - Should user have a private profile")
    public void addUserToLists_ShouldUserHavePrivateProfile() throws Exception {
        createUserToList(3L);

        mockMvc.perform(post(UI_V1_LISTS + "/add/user")
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/lists/add/user - Should user blocked my profile")
    public void addUserToLists_ShouldUserBlockedMyProfile() throws Exception {
        createUserToList(6L);

        mockMvc.perform(post(UI_V1_LISTS + "/add/user")
                        .header("X-auth-user-id", 2L)
                        .content(mapper.writeValueAsString(userToListsRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:2 is blocked")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/lists/add/user/1/6 - Add user to list")
    public void addUserToList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/1/6")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/lists/add/user/4/6 - Should user is blocked Add users to list")
    public void addUserToList_ShouldUserIsBlocked() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/4/6")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:4 is blocked")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/lists/add/user/3/6 - Should user have a private profile")
    public void addUserToList_ShouldUserHavePrivateProfile() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/3/6")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/lists/add/user/6/6 - Should user blocked my profile")
    public void addUserToList_ShouldUserBlockedMyProfile() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/6/6")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:2 is blocked")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/lists/add/user/7/99 - Should list Not Found")
    public void addUserToList_ShouldListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/7/99")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/add/user/1/4 - Remove user from list")
    public void removeUserFromList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/add/user/1/4")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/4/tweets - Get tweets by list id")
    public void getTweetsByListId() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/4/tweets")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(45L))
                .andExpect(jsonPath("$[0].text").value("media tweet test"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:38:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].user.id").value(1L))
                .andExpect(jsonPath("$[0].images[0].id").value(1L))
                .andExpect(jsonPath("$[0].quoteTweet.id").value(40L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(true))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(true))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/5/tweets - Get tweets by other user private list id")
    public void getTweetsByUserPrivateListId() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/5/tweets")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/4/details - Get list details")
    public void getListDetails() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/4/details")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value(LIST_NAME))
                .andExpect(jsonPath("$.description").value(LIST_DESCRIPTION))
                .andExpect(jsonPath("$.altWallpaper").value(LIST_ALT_WALLPAPER))
                .andExpect(jsonPath("$.wallpaper").isEmpty())
                .andExpect(jsonPath("$.listOwner.id").value(LIST_USER_ID))
                .andExpect(jsonPath("$.membersSize").value(1L))
                .andExpect(jsonPath("$.followersSize").value(1L))
                .andExpect(jsonPath("$.isPrivate").value(false))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/5/details - Get list details by other user private list")
    public void getListDetailsByUserPrivateList() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/5/details")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/4/2/followers - Get list followers")
    public void getListFollowers() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/4/2/followers")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME2))
                .andExpect(jsonPath("$[0].username").value(USERNAME2))
                .andExpect(jsonPath("$[0].about").value(ABOUT2))
                .andExpect(jsonPath("$[0].avatar.id").value(11L))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/99/2/followers - Get list followers should list Not Found")
    public void getListFollowers_ShouldListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/99/2/followers")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/5/1/followers - Get list followers by private list should list Not Found")
    public void getListFollowers_ByPrivateListShouldListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/5/1/followers")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/lists/10/5/followers - Get list followers by blocked user")
    public void getListFollowers_ByBlockedUserAndListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/10/5/followers")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:2 is blocked")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/4/2/members - Get list members")
    public void getListMembers() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/4/2/members")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME2))
                .andExpect(jsonPath("$[0].username").value(USERNAME2))
                .andExpect(jsonPath("$[0].about").value(ABOUT2))
                .andExpect(jsonPath("$[0].avatar.id").value(11L))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$[0].isMemberInList").value(true));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/9/1/members - Get list members by another user")
    public void getListMembersByAnotherUser() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/9/1/members")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME2))
                .andExpect(jsonPath("$[0].username").value(USERNAME2))
                .andExpect(jsonPath("$[0].about").value(ABOUT2))
                .andExpect(jsonPath("$[0].avatar.id").value(11L))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/99/2/members - Get list members should list Not Found")
    public void getListMembers_ShouldListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/99/2/members")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/lists/5/1/members - Get list members by private list should list Not Found")
    public void getListMembers_ByPrivateListShouldListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/5/1/members")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("List not found")));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/lists/10/5/members - Get list members by blocked user")
    public void getListMembers_ByBlockedUserAndListNotFound() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/10/5/members")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User with ID:2 is blocked")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/lists/search/2/MrCat - Search list members by username")
    public void searchListMembersByUsername() throws Exception {
        mockMvc.perform(get(UI_V1_LISTS + "/search/2/MrCat")
                        .header("X-auth-user-id", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
                .andExpect(jsonPath("$[0].id").value(USER_ID))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$[0].username").value(USERNAME))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$[0].isMemberInList").value(false));
    }
}
