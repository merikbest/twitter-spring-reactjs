package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.gmail.merikbest2015.commons.constants.ErrorMessage.INCORRECT_LIST_NAME_LENGTH;
import static com.gmail.merikbest2015.commons.constants.ErrorMessage.LIST_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ListsServiceHelperTest extends AbstractServiceTest {

    @Autowired
    private ListsServiceHelper listsServiceHelper;

    @Test
    public void isListIncludeUser() {
        when(listsRepository.isListIncludeUser(TestConstants.LIST_ID, TestConstants.USER_ID, 1L)).thenReturn(true);
        assertTrue(listsServiceHelper.isListIncludeUser(TestConstants.LIST_ID, 1L));
        verify(listsRepository, times(1)).isListIncludeUser(TestConstants.LIST_ID, TestConstants.USER_ID, 1L);
    }

    @Test
    public void checkIsListPrivate() {
        when(listsRepository.isListPrivate(TestConstants.LIST_ID, TestConstants.USER_ID)).thenReturn(true);
        when(listsRepository.isListFollowed(TestConstants.USER_ID, TestConstants.LIST_ID)).thenReturn(false);
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
        when(listsRepository.isListFollowed(TestConstants.LIST_ID, TestConstants.USER_ID)).thenReturn(true);
        listsServiceHelper.isMyProfileFollowList(TestConstants.LIST_ID);
        verify(listsRepository, times(1)).isListFollowed(TestConstants.LIST_ID, TestConstants.USER_ID);
    }

    @Test
    public void isListPinned() {
        when(listsRepository.isListPinned(1L, TestConstants.USER_ID)).thenReturn(true);
        listsServiceHelper.isListPinned(1L);
        verify(listsRepository, times(1)).isListPinned(1L, TestConstants.USER_ID);
    }
}
