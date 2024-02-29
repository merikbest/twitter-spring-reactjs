package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.merikbest2015.constants.ErrorMessage.INCORRECT_LIST_NAME_LENGTH;
import static com.gmail.merikbest2015.constants.ErrorMessage.LIST_NOT_FOUND;
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
    private NotificationClient notificationClient;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void isListIncludeUser() {
        when(listsRepository.isListIncludeUser(TestConstants.LIST_ID, USER_ID, 1L)).thenReturn(true);
        assertTrue(listsServiceHelper.isListIncludeUser(TestConstants.LIST_ID, 1L));
        verify(listsRepository, times(1)).isListIncludeUser(TestConstants.LIST_ID, USER_ID, 1L);
    }

    @Test
    public void checkIsListPrivate() {
        when(listsRepository.isListPrivate(TestConstants.LIST_ID, USER_ID)).thenReturn(true);
        when(listsRepository.isListFollowed(USER_ID, TestConstants.LIST_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.checkIsListPrivate(TestConstants.LIST_ID));
        assertEquals(LIST_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkIsListExist() {
        when(listsRepository.isListExist(TestConstants.LIST_ID, 1L)).thenReturn(true);
        listsServiceHelper.checkIsListExist(TestConstants.LIST_ID, 1L);
        verify(listsRepository, times(1)).isListExist(TestConstants.LIST_ID, 1L);
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
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.validateListNameLength(""));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void validateListNameLength_shouldLargeListName() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> listsServiceHelper.validateListNameLength("**************************"));
        assertEquals(INCORRECT_LIST_NAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void isMyProfileFollowList() {
        when(listsRepository.isListFollowed(USER_ID, TestConstants.LIST_ID)).thenReturn(true);
        listsServiceHelper.isMyProfileFollowList(TestConstants.LIST_ID);
        verify(listsRepository, times(1)).isListFollowed(USER_ID, TestConstants.LIST_ID);
    }

    @Test
    public void isListPinned() {
        when(listsRepository.isListPinned(1L, USER_ID)).thenReturn(true);
        listsServiceHelper.isListPinned(1L);
        verify(listsRepository, times(1)).isListPinned(1L, USER_ID);
    }
}
