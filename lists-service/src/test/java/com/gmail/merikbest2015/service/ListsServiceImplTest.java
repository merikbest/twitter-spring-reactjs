package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.ListsServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.ListsFollowers;
import com.gmail.merikbest2015.model.ListsMembers;
import com.gmail.merikbest2015.model.PinnedLists;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
import com.gmail.merikbest2015.repository.projection.BaseListProjection;
import com.gmail.merikbest2015.repository.projection.ListUserProjection;
import com.gmail.merikbest2015.repository.projection.PinnedListProjection;
import com.gmail.merikbest2015.repository.projection.SimpleListProjection;
import com.gmail.merikbest2015.service.util.ListsServiceHelper;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ListsServiceImplTest {

    @Autowired
    private ListsService listsService;

    @Autowired
    private ListsServiceHelper listsServiceHelper;

    @MockBean
    private ListsRepository listsRepository;

    @MockBean
    private ListsFollowersRepository listsFollowersRepository;

    @MockBean
    private ListsMembersRepository listsMembersRepository;

    @MockBean
    private PinnedListsRepository pinnedListsRepository;

    @MockBean
    private UserClient userClient;

    @MockBean
    private TweetClient tweetClient;

    @MockBean
    private NotificationClient notificationClient;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getAllTweetLists() {
        List<Long> listOwnerIds = List.of(1L, 2L, 3L);
        List<Long> validListUserIds = List.of(1L, 2L);
        when(listsRepository.getListOwnerIds()).thenReturn(listOwnerIds);
        when(userClient.getValidUserIds(new IdsRequest(listOwnerIds))).thenReturn(validListUserIds);
        when(listsRepository.getAllTweetLists(validListUserIds))
                .thenReturn(ListsServiceTestHelper.createMockListProjectionList());
        assertEquals(2, listsService.getAllTweetLists().size());
        verify(listsRepository, times(1)).getListOwnerIds();
        verify(userClient, times(1)).getValidUserIds(new IdsRequest(listOwnerIds));
        verify(listsRepository, times(1)).getAllTweetLists(validListUserIds);
    }

    @Test
    public void getUserTweetLists() {
        when(listsRepository.getUserTweetLists(USER_ID))
                .thenReturn(ListsServiceTestHelper.createMockListUserProjectionList());
        assertEquals(2, listsService.getUserTweetLists().size());
        verify(listsRepository, times(1)).getUserTweetLists(USER_ID);
    }

    @Test
    public void getUserPinnedLists() {
        when(listsRepository.getUserPinnedLists(USER_ID))
                .thenReturn(ListsServiceTestHelper.createMockPinnedListProjectionList());
        assertEquals(2, listsService.getUserPinnedLists().size());
        verify(listsRepository, times(1)).getUserPinnedLists(USER_ID);
    }

    @Test
    public void getListById() {
        BaseListProjection baseListProjection = ListsServiceTestHelper.createMockBaseListProjection(USER_ID);
        when(listsRepository.getListById(1L, USER_ID, BaseListProjection.class))
                .thenReturn(Optional.of(baseListProjection));
        assertEquals(baseListProjection, listsService.getListById(1L));
        verify(listsRepository, times(1)).getListById(1L, USER_ID, BaseListProjection.class);
        verify(userClient, never()).isUserHavePrivateProfile(USER_ID);
        verify(userClient, times(1)).isUserBlocked(LIST_USER_ID, USER_ID);
    }

    @Test
    public void getListById_shouldCheckIsPrivateUserProfile() {
        BaseListProjection baseListProjection = ListsServiceTestHelper.createMockBaseListProjection(3L);
        when(listsRepository.getListById(1L, USER_ID, BaseListProjection.class))
                .thenReturn(Optional.of(baseListProjection));
        assertEquals(baseListProjection, listsService.getListById(1L));
        verify(listsRepository, times(1)).getListById(1L, USER_ID, BaseListProjection.class);
        verify(userClient, times(1)).isUserHavePrivateProfile(3L);
        verify(userClient, times(1)).isUserBlocked(3L, USER_ID);
    }

    @Test
    public void getListById_shouldCheckUserPrivateProfileAndReturnUserNotFound() {
        BaseListProjection baseListProjection = ListsServiceTestHelper.createMockBaseListProjection(3L);
        when(listsRepository.getListById(1L, USER_ID, BaseListProjection.class))
                .thenReturn(Optional.of(baseListProjection));
        when(userClient.isUserHavePrivateProfile(3L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.getListById(1L));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getListById_shouldCheckUserIsBlockedAndReturnBlockedUser() {
        BaseListProjection baseListProjection = ListsServiceTestHelper.createMockBaseListProjection(3L);
        when(listsRepository.getListById(1L, USER_ID, BaseListProjection.class))
                .thenReturn(Optional.of(baseListProjection));
        when(userClient.isUserBlocked(USER_ID, 3L)).thenReturn(true);
        listsService.getListById(1L);
        ApiRequestException exception = assertThrows(
                ApiRequestException.class, () -> listsServiceHelper.checkUserIsBlocked(USER_ID, 3L));
        assertEquals(String.format(USER_ID_BLOCKED, 3L), exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getListById_shouldReturnListNotFound() {
        when(listsRepository.getListById(LIST_USER_ID, USER_ID, BaseListProjection.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.getListById(LIST_USER_ID));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void createTweetList() {
        Lists lists = ListsServiceTestHelper.createMockLists();
        ListUserProjection listUser = ListsServiceTestHelper.createMockListUserProjectionList().get(0);
        when(listsRepository.getListById(lists.getId(), ListUserProjection.class)).thenReturn(listUser);
        assertEquals(listUser, listsService.createTweetList(lists));
        verify(listsRepository, times(1)).save(lists);
        verify(listsRepository, times(1)).getListById(lists.getId(), ListUserProjection.class);
    }

    @Test
    public void createTweetList_shouldEmptyListNameAndReturnException() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setName("");
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.createTweetList(lists));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void createTweetList_shouldLargeListNameAndReturnException() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setName("**************************");
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.createTweetList(lists));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void createTweetList_shouldValidateListOwnerIdAndReturnException() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setListOwnerId(3L);
        lists.setName("test");
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.createTweetList(lists));
        assertEquals(LIST_OWNER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserTweetListsById() {
        when(listsRepository.getUserTweetListsById(USER_ID))
                .thenReturn(ListsServiceTestHelper.createMockListProjectionList());
        assertEquals(2, listsService.getUserTweetListsById(USER_ID).size());
        verify(listsRepository, times(1)).getUserTweetListsById(USER_ID);
        verify(userClient, never()).isUserBlocked(USER_ID, USER_ID);
        verify(userClient, never()).isUserHavePrivateProfile(USER_ID);
    }

    @Test
    public void getUserTweetListsById_shouldUserBlockedAndReturnEmptyList() {
        when(userClient.isUserBlocked(USER_ID, 3L)).thenReturn(true);
        assertEquals(0, listsService.getUserTweetListsById(3L).size());
        verify(listsRepository, never()).getUserTweetListsById(3L);
        verify(userClient, times(1)).isUserBlocked(USER_ID, 3L);
        verify(userClient, never()).isUserHavePrivateProfile(3L);
    }

    @Test
    public void getUserTweetListsById_shouldUserPrivateAndReturnEmptyList() {
        when(userClient.isUserBlocked(USER_ID, 3L)).thenReturn(false);
        when(userClient.isUserHavePrivateProfile(3L)).thenReturn(true);
        assertEquals(0, listsService.getUserTweetListsById(3L).size());
        verify(listsRepository, never()).getUserTweetListsById(3L);
        verify(userClient, times(1)).isUserBlocked(USER_ID, 3L);
        verify(userClient, times(1)).isUserHavePrivateProfile(3L);
    }

    @Test
    public void getUserTweetListsById_shouldReturnUserTweetLists() {
        when(listsRepository.getUserTweetListsById(3L))
                .thenReturn(ListsServiceTestHelper.createMockListProjectionList());
        when(userClient.isUserBlocked(USER_ID, 3L)).thenReturn(false);
        when(userClient.isUserHavePrivateProfile(3L)).thenReturn(false);
        assertEquals(2, listsService.getUserTweetListsById(3L).size());
        verify(listsRepository, times(1)).getUserTweetListsById(3L);
        verify(userClient, times(1)).isUserBlocked(USER_ID, 3L);
        verify(userClient, times(1)).isUserHavePrivateProfile(3L);
    }

    @Test
    public void getTweetListsWhichUserIn() {
        when(listsRepository.getTweetListsByIds(USER_ID))
                .thenReturn(ListsServiceTestHelper.createMockListProjectionList());
        assertEquals(2, listsService.getTweetListsWhichUserIn().size());
        verify(listsRepository, times(1)).getTweetListsByIds(USER_ID);
    }

    @Test
    public void editTweetList() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setListOwnerId(TestConstants.LIST_USER_ID);
        lists.setName(TestConstants.LIST_NAME);
        lists.setDescription(TestConstants.LIST_DESCRIPTION);
        lists.setWallpaper("");
        lists.setPrivate(false);
        BaseListProjection baseListProjection = ListsServiceTestHelper.createMockBaseListProjection(USER_ID);
        when(listsRepository.findById(1L)).thenReturn(Optional.of(ListsServiceTestHelper.createMockLists()));
        when(listsRepository.getListById(1L, USER_ID, BaseListProjection.class)).thenReturn(Optional.of(baseListProjection));
        BaseListProjection baseList = listsService.editTweetList(lists);
        assertEquals(baseListProjection, baseList);
        assertEquals(TestConstants.LIST_NAME, baseList.getName());
        assertEquals(TestConstants.LIST_DESCRIPTION, baseList.getDescription());
        assertEquals("", baseList.getWallpaper());
        assertFalse(baseList.getIsPrivate());
        verify(listsRepository, times(1)).getListById(1L, USER_ID, BaseListProjection.class);
    }

    @Test
    public void editTweetList_shouldReturnNotFound() {
        when(listsRepository.findById(1L)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.editTweetList(new Lists()));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void editTweetList_shouldEmptyListNameAndReturnException() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setName("");
        when(listsRepository.findById(1L)).thenReturn(Optional.of(ListsServiceTestHelper.createMockLists()));
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.editTweetList(lists));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void editTweetList_shouldLargeListNameAndReturnException() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setName("**************************");
        when(listsRepository.findById(1L)).thenReturn(Optional.of(ListsServiceTestHelper.createMockLists()));
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> listsService.editTweetList(lists));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void deleteList() {
        Lists list = ListsServiceTestHelper.createMockLists();
        when(listsRepository.findById(1L)).thenReturn(Optional.of(list));
        assertEquals(String.format("List id:%s deleted.", 1L), listsService.deleteList(1L));
        verify(listsRepository, times(1)).findById(1L);
        verify(pinnedListsRepository, times(1)).deletePinnedList(1L);
        verify(listsRepository, times(1)).delete(list);
    }

    @Test
    public void deleteList_shouldListNotFound() {
        when(listsRepository.findById(1L)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsService.deleteList(1L));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void deleteList_shouldValidateListOwnerAndReturnException() {
        Lists lists = new Lists();
        lists.setId(1L);
        lists.setListOwnerId(3L);
        lists.setName("test");
        when(listsRepository.findById(1L)).thenReturn(Optional.of(lists));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsService.deleteList(1L));
        assertEquals(LIST_OWNER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void followList_followSuccess() {
        ListUserProjection listUser = ListsServiceTestHelper.createMockListUserProjectionList().get(0);
        when(listsRepository.findByIdAndIsPrivateFalse(1L)).thenReturn(true);
        when(listsFollowersRepository.getListFollower(1L, USER_ID)).thenReturn(null);
        when(listsRepository.getListById(1L, ListUserProjection.class)).thenReturn(listUser);
        assertEquals(listUser, listsService.followList(1L));
        verify(listsRepository, times(1)).findByIdAndIsPrivateFalse(1L);
        verify(listsFollowersRepository, times(1)).getListFollower(1L, USER_ID);
        verify(listsFollowersRepository, times(1)).save(new ListsFollowers(1L, USER_ID));
        verify(listsRepository, times(1)).getListById(1L, ListUserProjection.class);
    }

    @Test
    public void followList_unfollowSuccess() {
        ListsFollowers listsFollowers = new ListsFollowers();
        listsFollowers.setId(1L);
        listsFollowers.setListId(1L);
        listsFollowers.setFollowerId(1L);
        ListUserProjection listUser = ListsServiceTestHelper.createMockListUserProjectionList().get(0);
        when(listsRepository.findByIdAndIsPrivateFalse(1L)).thenReturn(true);
        when(listsFollowersRepository.getListFollower(1L, USER_ID)).thenReturn(listsFollowers);
        when(listsRepository.getListById(1L, ListUserProjection.class)).thenReturn(listUser);
        assertEquals(listUser, listsService.followList(1L));
        verify(listsRepository, times(1)).findByIdAndIsPrivateFalse(1L);
        verify(listsFollowersRepository, times(1)).getListFollower(1L, USER_ID);
        verify(listsFollowersRepository, times(1)).delete(listsFollowers);
        verify(pinnedListsRepository, times(1)).removePinnedList(1L, USER_ID);
        verify(listsRepository, times(1)).getListById(1L, ListUserProjection.class);
    }

    @Test
    public void followList_shoutReturnListNotFoundException() {
        when(listsRepository.findByIdAndIsPrivateFalse(1L)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsService.followList(1L));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void pinList_pinSuccess() {
        testPinList(false);
    }

    @Test
    public void pinList_unpinSuccess() {
        testPinList(true);
    }

    public void testPinList(boolean isPinned) {
        PinnedListProjection pinnedList = ListsServiceTestHelper.createMockPinnedListProjectionList().get(0);
        Lists list = ListsServiceTestHelper.createMockLists();
        PinnedLists pinnedLists = new PinnedLists(list, USER_ID);
        when(listsRepository.getListWhereUserConsist(1L, USER_ID)).thenReturn(Optional.of(list));
        when(pinnedListsRepository.getPinnedByUserIdAndListId(1L, USER_ID)).thenReturn(isPinned ? pinnedLists : null);
        when(listsRepository.getListById(1L, PinnedListProjection.class)).thenReturn(pinnedList);
        assertEquals(pinnedList, listsService.pinList(1L));
        verify(listsRepository, times(1)).getListWhereUserConsist(1L, USER_ID);
        verify(pinnedListsRepository, times(1)).getPinnedByUserIdAndListId(1L, USER_ID);
        verify(pinnedListsRepository, isPinned ? times(1) : never()).delete(pinnedLists);
        verify(pinnedListsRepository, isPinned ? never() : times(1)).save(pinnedLists);
        verify(listsRepository, times(1)).getListById(1L, PinnedListProjection.class);
    }
}
