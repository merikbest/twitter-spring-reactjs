package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.USER_ID_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BlockUserServiceImplTest extends AbstractServiceTest {

    @Autowired
    private BlockUserService blockUserService;

    private User user;

    @Before
    public void setUp() {
        super.setUp();
        user = new User();
        user.setId(2L);
    }

    @Test
    public void getBlockList_ShouldReturnBlockedUserProjections() {
        Page<BlockedUserProjection> blockedUserProjections = UserServiceTestHelper.createBlockedUserProjections();
        when(blockUserRepository.getUserBlockListById(TestConstants.USER_ID, pageable)).thenReturn(blockedUserProjections);
        assertEquals(blockedUserProjections, blockUserService.getBlockList(pageable));
        verify(blockUserRepository, times(1)).getUserBlockListById(TestConstants.USER_ID, pageable);
    }

    @Test
    public void processBlockList_ShouldBlockUser() {
        when(userRepository.findById(2L)).thenReturn(Optional.of(user));
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 2L)).thenReturn(false);
        assertTrue(blockUserService.processBlockList(2L));
        verify(userRepository, times(1)).findById(2L);
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 2L);
    }

    @Test
    public void processBlockList_ShouldUnblockUser() {
        when(userRepository.findById(2L)).thenReturn(Optional.of(user));
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 2L)).thenReturn(true);
        assertFalse(blockUserService.processBlockList(TestConstants.USER_ID));
        verify(userRepository, times(1)).findById(2L);
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 2L);
    }

    @Test
    public void processBlockList_ShouldUserNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> blockUserService.processBlockList(TestConstants.USER_ID));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
    }
}
