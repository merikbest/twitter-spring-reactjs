package com.gmail.merikbest2015;

import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.util.TestConstants;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.util.TestConstants.*;

public class ListsServiceTestHelper {

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    public static List<ListProjection> createMockListProjectionList() {
        ListProjection list1 = factory.createProjection(
                ListProjection.class,
                Map.of(
                        "id", 1L,
                        "listName", TestConstants.LIST_NAME,
                        "description", TestConstants.LIST_DESCRIPTION,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "listOwner", mockUser(USER_ID),
                        "isFollower", false,
                        "isListPinned", false));
        ListProjection list2 = factory.createProjection(
                ListProjection.class,
                Map.of(
                        "id", 2L,
                        "listName", TestConstants.LIST_NAME_2,
                        "description", TestConstants.LIST_DESCRIPTION,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "listOwner", mockUser(USER_ID),
                        "isFollower", false,
                        "isListPinned", false));
        return Arrays.asList(list1, list2);
    }

    public static List<ListUserProjection> createMockListUserProjectionList() {
        ListUserProjection listUser1 = factory.createProjection(
                ListUserProjection.class,
                Map.of(
                        "id", 1L,
                        "listName", TestConstants.LIST_NAME,
                        "description", TestConstants.LIST_DESCRIPTION,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "listOwner", mockUser(USER_ID),
                        "isListPinned", false,
                        "isPrivate", false));
        ListUserProjection listUser2 = factory.createProjection(
                ListUserProjection.class,
                Map.of(
                        "id", 2L,
                        "listName", TestConstants.LIST_NAME_2,
                        "description", TestConstants.LIST_DESCRIPTION,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "listOwner", mockUser(USER_ID),
                        "isListPinned", false,
                        "isPrivate", false));
        return Arrays.asList(listUser1, listUser2);
    }

    public static List<PinnedListProjection> createMockPinnedListProjectionList() {
        PinnedListProjection pinnedList1 = factory.createProjection(
                PinnedListProjection.class,
                Map.of(
                        "id", 1L,
                        "listName", TestConstants.LIST_NAME,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "isListPinned", false,
                        "isPrivate", false));
        PinnedListProjection pinnedList2 = factory.createProjection(
                PinnedListProjection.class,
                Map.of(
                        "id", 2L,
                        "listName", TestConstants.LIST_NAME_2,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "isListPinned", false,
                        "isPrivate", false));
        return Arrays.asList(pinnedList1, pinnedList2);
    }

    public static List<SimpleListProjection> createMockSimpleListProjectionList() {
        SimpleListProjection simpleList1 = factory.createProjection(
                SimpleListProjection.class,
                Map.of(
                        "id", 1L,
                        "listName", TestConstants.LIST_NAME,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "isPrivate", false));
        SimpleListProjection simpleList2 = factory.createProjection(
                SimpleListProjection.class,
                Map.of(
                        "id", 2L,
                        "listName", TestConstants.LIST_NAME_2,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "isPrivate", false));
        return Arrays.asList(simpleList1, simpleList2);
    }

    public static List<ListMemberResponse> createMockListMemberResponseList() {
        ListMemberResponse listMember1 = new ListMemberResponse();
        listMember1.setId(1L);
        listMember1.setFullName("test name 1");
        listMember1.setUsername("test username 1");
        listMember1.setAbout("");
        listMember1.setAvatar("");
        listMember1.setMemberInList(false);
        listMember1.setPrivateProfile(false);
        ListMemberResponse listMember2 = new ListMemberResponse();
        listMember1.setId(2L);
        listMember1.setFullName("test name 2");
        listMember1.setUsername("test username 2");
        listMember1.setAbout("");
        listMember1.setAvatar("");
        listMember1.setMemberInList(false);
        listMember1.setPrivateProfile(false);
        return Arrays.asList(listMember1, listMember2);
    }

    public static BaseListProjection createMockBaseListProjection(Long listOwnerId) {
        Map<String, Object> baseListMap = new HashMap<>();
        baseListMap.put("id", TestConstants.LIST_ID);
        baseListMap.put("listName", TestConstants.LIST_NAME);
        baseListMap.put("description", TestConstants.LIST_DESCRIPTION);
        baseListMap.put("altWallpaper", TestConstants.LIST_ALT_WALLPAPER);
        baseListMap.put("wallpaper", "");
        baseListMap.put("isPrivate", false);
        baseListMap.put("listOwner", mockUser(listOwnerId));
        baseListMap.put("membersSize", 111L);
        baseListMap.put("followersSize", 111L);
        baseListMap.put("isFollower", true);
        return factory.createProjection(BaseListProjection.class, baseListMap);
    }

    public static Lists createMockLists() {
        Lists lists = new Lists();
        lists.setId(TestConstants.LIST_ID);
        lists.setListName(TestConstants.LIST_NAME);
        lists.setDescription(TestConstants.LIST_DESCRIPTION);
        lists.setAltWallpaper(TestConstants.LIST_ALT_WALLPAPER);
        lists.setPrivate(false);
        lists.setWallpaper("");
        lists.setListOwner(mockUser(USER_ID));
        return lists;
    }

    public static UserToListsRequest mockUserToListsRequest() {
        UserToListsRequest listsRequest = new UserToListsRequest();
        listsRequest.setUserId(1L);
        listsRequest.setLists(List.of(
                new UserToListsRequest.ListsRequest(1L, true),
                new UserToListsRequest.ListsRequest(2L, false)
        ));
        return listsRequest;
    }

    public static TweetListProjection mockTweetListProjection(Long userId) {
        return factory.createProjection(
                TweetListProjection.class,
                Map.of(
                        "id", TestConstants.LIST_ID,
                        "listName", TestConstants.LIST_NAME,
                        "altWallpaper", TestConstants.LIST_ALT_WALLPAPER,
                        "wallpaper", "",
                        "listOwner", mockUser(userId),
                        "isPrivate", false,
                        "membersSize", 1L
                ));
    }

    public static User mockUser(Long userId) {
        User user = new User();
        user.setId(userId);
        user.setFullName(FULL_NAME);
        user.setUsername(USERNAME);
        user.setAbout(ABOUT);
        user.setAvatar(AVATAR_SRC_1);
        user.setPrivateProfile(false);
        user.setActive(true);
        return user;
    }
}
