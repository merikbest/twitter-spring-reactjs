package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.ListsServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
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

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ListsServiceHelperTest {

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
    private NotificationClient notificationClient;

    @MockBean
    private UserClient userClient;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getListMemberResponses() {
        List<Long> membersIds = List.of(1L, 2L, 3L);
        List<ListMemberResponse> mockListMemberResponseList = ListsServiceTestHelper.createMockListMemberResponseList();
        when(listsMembersRepository.getMembersIds(1L)).thenReturn(membersIds);
        when(userClient.getListParticipantsByIds(new IdsRequest(membersIds))).thenReturn(mockListMemberResponseList);
        assertEquals(mockListMemberResponseList, listsServiceHelper.getListMemberResponses(1L));
        verify(listsMembersRepository, times(1)).getMembersIds(1L);
        verify(userClient, times(1)).getListParticipantsByIds(new IdsRequest(membersIds));
    }

    @Test
    public void isListIncludeUser() {
        when(listsRepository.isListIncludeUser(1L, USER_ID, 1L)).thenReturn(true);
        assertTrue(listsServiceHelper.isListIncludeUser(1L, 1L));
        verify(listsRepository, times(1)).isListIncludeUser(1L, USER_ID, 1L);
    }

    @Test
    public void checkUserIsBlocked() {
        when(userClient.isUserBlocked(1L, 1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.checkUserIsBlocked(1L, 1L));
        assertEquals(String.format(USER_ID_BLOCKED, 1L), exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void checkUserIsNotBlocked() {
        when(userClient.isUserBlocked(1L, 1L)).thenReturn(false);
        listsServiceHelper.checkUserIsBlocked(1L, 1L);
        verify(userClient, times(1)).isUserBlocked(1L, 1L);
    }

    @Test
    public void checkIsPrivateUserProfile() {
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.checkIsPrivateUserProfile(1L));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkIsNotPrivateUserProfile() {
        when(userClient.isUserHavePrivateProfile(1L)).thenReturn(false);
        listsServiceHelper.checkIsPrivateUserProfile(1L);
        verify(userClient, times(1)).isUserHavePrivateProfile(1L);
    }

    @Test
    public void checkIsListPrivate() {
        when(listsRepository.isListPrivate(1L, USER_ID)).thenReturn(true);
        when(listsFollowersRepository.isListFollowed(USER_ID, 1L)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.checkIsListPrivate(1L));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkIsListNotPrivate() {
        when(listsRepository.isListPrivate(1L, USER_ID)).thenReturn(false);
        when(listsFollowersRepository.isListFollowed(USER_ID, 1L)).thenReturn(true);
        listsServiceHelper.checkIsListPrivate(1L);
        verify(listsRepository, times(1)).isListPrivate(1L, USER_ID);
        verify(listsFollowersRepository, times(1)).isListFollowed(USER_ID, 1L);
    }

    @Test
    public void checkIsListNotExist() {
        when(listsRepository.isListExist(1L, 1L)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.checkIsListExist(1L, 1L));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkIsListExist() {
        when(listsRepository.isListExist(1L, 1L)).thenReturn(true);
        listsServiceHelper.checkIsListExist(1L, 1L);
        verify(listsRepository, times(1)).isListExist(1L, 1L);
    }

    @Test
    public void sendNotification() {
        NotificationRequest notificationRequest = NotificationRequest.builder()
                .notificationType(NotificationType.LISTS)
                .notificationCondition(true)
                .notifiedUserId(1L)
                .userId(2L)
                .listId(4L)
                .build();
        listsServiceHelper.sendNotification(1L, 2L, 4L);
        verify(notificationClient, times(1)).sendNotification(notificationRequest);
    }

    @Test
    public void validateListNameLength_shouldEmptyListName() {
        listsServiceHelper.validateListNameLength("");
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.validateListNameLength(""));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void validateListNameLength_shouldLargeListName() {
        listsServiceHelper.validateListNameLength("**************************");
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.validateListNameLength("**************************"));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }


    
}
