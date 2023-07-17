package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.ListsServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
import com.gmail.merikbest2015.repository.projection.BaseListProjection;
import com.gmail.merikbest2015.repository.projection.ListUserProjection;
import com.gmail.merikbest2015.service.util.ListsServiceHelper;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.util.TestConstants.LIST_USER_ID;
import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
}
