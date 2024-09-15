package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static com.gmail.merikbest2015.commons.constants.ErrorMessage.USER_ID_NOT_FOUND;
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
        user.setId(1L);
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
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(false);
        assertTrue(blockUserService.processBlockList(1L));
        verify(userRepository, times(1)).findById(1L);
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 1L);
        verify(blockUserRepository, times(1)).blockUser(TestConstants.USER_ID, 1L);
        verify(followerUserRepository, times(1)).unfollow(TestConstants.USER_ID, 1L);
        verify(followerUserRepository, times(1)).unfollow(1L, TestConstants.USER_ID);
        verify(blockUserProducer, times(1)).sendBlockUserEvent(user, TestConstants.USER_ID, true);
    }

    @Test
    public void processBlockList_ShouldUnblockUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        assertFalse(blockUserService.processBlockList(1L));
        verify(userRepository, times(1)).findById(1L);
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 1L);
        verify(blockUserRepository, times(1)).unblockUser(TestConstants.USER_ID, 1L);
        verify(blockUserProducer, times(1)).sendBlockUserEvent(user, TestConstants.USER_ID, false);
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
