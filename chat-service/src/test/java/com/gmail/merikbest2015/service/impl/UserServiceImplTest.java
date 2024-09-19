package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.commons.constants.ErrorMessage;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.ChatErrorMessage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceImplTest extends AbstractServiceTest {

    @Autowired
    private UserServiceImpl userService;

    @Test
    public void getAuthUser_shouldReturnUser() {
        User user = new User();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        assertEquals(user, userService.getAuthUser());
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
    }

    @Test
    public void getAuthUser_shouldThrowUserNotFoundException() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getAuthUser());
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
    }

    @Test
    public void getUserById_shouldReturnUser() {
        User user = new User();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        assertEquals(user, userService.getUserById(TestConstants.USER_ID));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
    }

    @Test
    public void getUserById_shouldThrowUserNotFoundException() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getUserById(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserProjectionById_shouldReturnUserProjection() {
        UserProjection userProjection = ChatServiceTestHelper.createUserProjection();
        when(userRepository.getUserById(TestConstants.USER_ID)).thenReturn(Optional.of(userProjection));
        assertEquals(userProjection, userService.getUserProjectionById(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID);
    }

    @Test
    public void getUserProjectionById_shouldThrowUserNotFoundException() {
        when(userRepository.getUserById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getUserProjectionById(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void searchUsersByUsername_shouldReturnPageableUserChatProjection() {
        PageRequest pageable = PageRequest.of(0, 20);
        List<UserChatProjection> mockUserChatProjectionList = ChatServiceTestHelper.createMockUserChatProjectionList();
        Page<UserChatProjection> userChatProjections = new PageImpl<>(mockUserChatProjectionList, pageable, 20);
        when(userRepository.searchUsersByUsername(TestConstants.USERNAME, pageable, UserChatProjection.class))
                .thenReturn(userChatProjections);
        assertEquals(userChatProjections, userService.searchUsersByUsername(TestConstants.USERNAME, pageable));
        verify(userRepository, times(1)).searchUsersByUsername(TestConstants.USERNAME, pageable, UserChatProjection.class);
    }

    @Test
    public void getNotBlockedUsers_shouldReturnUsersList() {
        List<Long> usersIds = List.of(1L, 2L, 3L);
        List<User> users = List.of(new User(), new User());
        when(userRepository.getNotBlockedUsers(usersIds, TestConstants.USER_ID)).thenReturn(users);
        assertEquals(users, userService.getNotBlockedUsers(usersIds));
        verify(userRepository, times(1)).getNotBlockedUsers(usersIds, TestConstants.USER_ID);
    }

    @Test
    public void isParticipantBlocked_shouldThrowChatParticipantBlockedException() {
        when(userRepository.isUserBlocked(TestConstants.USER_ID, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.isParticipantBlocked(TestConstants.USER_ID, TestConstants.USER_ID));
        assertEquals(ChatErrorMessage.CHAT_PARTICIPANT_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void isUserBlockedByMyProfile_shouldReturnTrue() {
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        assertTrue(userService.isUserBlockedByMyProfile(1L));
        verify(userRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 1L);
    }

    @Test
    public void isMyProfileBlockedByUser_shouldReturnTrue() {
        when(userRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userService.isMyProfileBlockedByUser(1L));
        verify(userRepository, times(1)).isUserBlocked(1L, TestConstants.USER_ID);
    }

    @Test
    public void isMyProfileWaitingForApprove_shouldReturnTrue() {
        when(userRepository.isMyProfileWaitingForApprove(1L, TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userService.isMyProfileWaitingForApprove(1L));
        verify(userRepository, times(1)).isMyProfileWaitingForApprove(1L, TestConstants.USER_ID);
    }

    @Test
    public void isUserFollowByOtherUser_shouldReturnTrue() {
        when(userRepository.isUserFollowByOtherUser(TestConstants.USER_ID, 1L)).thenReturn(true);
        assertTrue(userService.isUserFollowByOtherUser(1L));
        verify(userRepository, times(1)).isUserFollowByOtherUser(TestConstants.USER_ID, 1L);
    }
}
