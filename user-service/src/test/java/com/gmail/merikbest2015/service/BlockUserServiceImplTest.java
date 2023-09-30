package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.repository.BlockUserRepository;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.service.impl.BlockUserServiceImpl;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import static com.gmail.merikbest2015.constants.ErrorMessage.USER_ID_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BlockUserServiceImplTest extends AbstractAuthTest {

    @Autowired
    private BlockUserServiceImpl blockUserService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private BlockUserRepository blockUserRepository;

    @MockBean
    private FollowerUserRepository followerUserRepository;

    @MockBean
    private UserRepository userRepository;

    @Before
    public void setUp() {
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
    }

    @Test
    public void getBlockList_ShouldReturnBlockedUserProjections() {
        Page<BlockedUserProjection> blockedUserProjections = UserServiceTestHelper.createBlockedUserProjections();
        when(blockUserRepository.getUserBlockListById(TestConstants.USER_ID, pageable)).thenReturn(blockedUserProjections);
        assertEquals(blockedUserProjections, blockUserService.getBlockList(pageable));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(blockUserRepository, times(1)).getUserBlockListById(TestConstants.USER_ID, pageable);
    }

    @Test
    public void processBlockList_ShouldBlockUser() {
        when(userRepository.isUserExist(TestConstants.USER_ID)).thenReturn(true);
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 2L)).thenReturn(false);
        assertTrue(blockUserService.processBlockList(TestConstants.USER_ID));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).isUserExist(TestConstants.USER_ID);
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 2L);
        verify(blockUserRepository, times(1)).blockUser(TestConstants.USER_ID, 2L);
        verify(followerUserRepository, times(2)).unfollow(any(), any());
    }

    @Test
    public void processBlockList_ShouldUnblockUser() {
        when(userRepository.isUserExist(TestConstants.USER_ID)).thenReturn(true);
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 2L)).thenReturn(true);
        assertFalse(blockUserService.processBlockList(TestConstants.USER_ID));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).isUserExist(TestConstants.USER_ID);
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 2L);
        verify(blockUserRepository, times(1)).unblockUser(TestConstants.USER_ID, 2L);
    }

    @Test
    public void processBlockList_ShouldUserNotFound() {
        when(userRepository.isUserExist(TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> blockUserService.processBlockList(TestConstants.USER_ID));
        assertEquals(String.format(USER_ID_NOT_FOUND, TestConstants.USER_ID), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(userRepository, times(1)).isUserExist(TestConstants.USER_ID);
    }
}
