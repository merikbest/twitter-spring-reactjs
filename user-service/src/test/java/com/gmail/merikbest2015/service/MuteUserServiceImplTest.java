package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.UserErrorMessage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.MutedUserProjection;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MuteUserServiceImplTest extends AbstractServiceTest {

    @Autowired
    private MuteUserService muteUserService;

    private User user;

    @Before
    public void setUp() {
        super.setUp();
        user = new User();
        user.setId(1L);
    }

    @Test
    public void getMutedList_ShouldReturnMutedUserProjections() {
        Page<MutedUserProjection> mutedUserProjection = UserServiceTestHelper.createMutedUserProjections();
        when(muteUserRepository.getUserMuteListById(TestConstants.USER_ID, pageable)).thenReturn(mutedUserProjection);
        assertEquals(mutedUserProjection, muteUserService.getMutedList(pageable));
        verify(muteUserRepository, times(1)).getUserMuteListById(TestConstants.USER_ID, pageable);
    }

    @Test
    public void processMutedList_ShouldMuteUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(muteUserRepository.isUserMuted(TestConstants.USER_ID, 1L)).thenReturn(false);
        assertTrue(muteUserService.processMutedList(1L));
        verify(userRepository, times(1)).findById(1L);
        verify(muteUserRepository, times(1)).isUserMuted(TestConstants.USER_ID, 1L);
        verify(muteUserRepository, times(1)).muteUser(TestConstants.USER_ID, 1L);
        verify(muteUserProducer, times(1)).sendMuteUserEvent(user, TestConstants.USER_ID, true);
    }

    @Test
    public void processMutedList_ShouldUnmuteUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(muteUserRepository.isUserMuted(TestConstants.USER_ID, 1L)).thenReturn(true);
        assertFalse(muteUserService.processMutedList(1L));
        verify(userRepository, times(1)).findById(1L);
        verify(muteUserRepository, times(1)).isUserMuted(TestConstants.USER_ID, 1L);
        verify(muteUserRepository, times(1)).unmuteUser(TestConstants.USER_ID, 1L);
        verify(muteUserProducer, times(1)).sendMuteUserEvent(user, TestConstants.USER_ID, false);
    }

    @Test
    public void processMutedList_ShouldUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> muteUserService.processMutedList(1L));
        assertEquals(String.format(UserErrorMessage.USER_ID_NOT_FOUND, 1L), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(userRepository, times(1)).findById(1L);
    }
}
