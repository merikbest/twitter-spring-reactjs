package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.event.FollowRequestUserEvent;
import com.gmail.merikbest2015.event.FollowUserEvent;
import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static java.lang.Long.parseLong;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserHandlerServiceImplTest extends AbstractServiceTest {

    @Autowired
    private UserHandlerServiceImpl userHandlerService;

    @Test
    public void handleUpdateUser_shouldUpdateUser() {
        UpdateUserEvent updateUserEvent = mockUpdateUserEvent();
        when(userRepository.findById(updateUserEvent.getId())).thenReturn(Optional.of(new User()));
        userHandlerService.handleNewOrUpdateUser(updateUserEvent);
        verify(userRepository, times(1)).findById(updateUserEvent.getId());
    }

    @Test
    public void handleUpdateUser_shouldCreateUser() {
        UpdateUserEvent updateUserEvent = mockUpdateUserEvent();
        when(userRepository.findById(updateUserEvent.getId())).thenReturn(Optional.empty());
        userHandlerService.handleNewOrUpdateUser(updateUserEvent);
        verify(userRepository, times(1)).findById(updateUserEvent.getId());
        verify(userRepository, times(1)).save(any());
    }

    @Test
    public void handleBlockUser_shouldBlockUser() {
        BlockUserEvent blockUserEvent = mockBlockUserEvent(true);
        User user = mockUser(3L);
        User authUser = mockUser(TestConstants.USER_ID);
        String authId = TestConstants.USER_ID.toString();
        when(userRepository.findById(blockUserEvent.getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(parseLong(authId))).thenReturn(Optional.of(authUser));
        userHandlerService.handleBlockUser(blockUserEvent, authId);
        verify(userRepository, times(2)).findById(any());
        assertEquals(1L, authUser.getUserBlockedList().size());
    }

    @Test
    public void handleBlockUser_shouldUnblockUser() {
        BlockUserEvent blockUserEvent = mockBlockUserEvent(false);
        User user = mockUser(3L);
        User authUser = mockUser(TestConstants.USER_ID);
        authUser.getUserBlockedList().add(user);
        String authId = TestConstants.USER_ID.toString();
        when(userRepository.findById(blockUserEvent.getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(parseLong(authId))).thenReturn(Optional.of(authUser));
        userHandlerService.handleBlockUser(blockUserEvent, authId);
        assertEquals(1L, authUser.getUserBlockedList().size());
    }

    @Test
    public void handleFollowUser_shouldFollowUser() {
        FollowUserEvent followUserEvent = mockFollowUserEvent(true);
        User user = mockUser(3L);
        User authUser = mockUser(TestConstants.USER_ID);
        String authId = TestConstants.USER_ID.toString();
        when(userRepository.findById(followUserEvent.getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(parseLong(authId))).thenReturn(Optional.of(authUser));
        userHandlerService.handleFollowUser(followUserEvent, authId);
        verify(userRepository, times(2)).findById(any());
        assertEquals(1L, authUser.getFollowers().size());
    }

    @Test
    public void handleFollowUser_shouldUnfollowUser() {
        FollowUserEvent followUserEvent = mockFollowUserEvent(false);
        User user = mockUser(3L);
        User authUser = mockUser(TestConstants.USER_ID);
        authUser.getFollowers().add(user);
        String authId = TestConstants.USER_ID.toString();
        when(userRepository.findById(followUserEvent.getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(parseLong(authId))).thenReturn(Optional.of(authUser));
        userHandlerService.handleFollowUser(followUserEvent, authId);
        verify(userRepository, times(2)).findById(any());
        assertEquals(1L, authUser.getFollowers().size());
    }

    @Test
    public void handleFollowUserRequest_shouldFollowUser() {
        FollowRequestUserEvent followUserEvent = mockFollowRequestUserEvent(true);
        User user = mockUser(3L);
        User authUser = mockUser(TestConstants.USER_ID);
        String authId = TestConstants.USER_ID.toString();
        when(userRepository.findById(followUserEvent.getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(parseLong(authId))).thenReturn(Optional.of(authUser));
        userHandlerService.handleFollowUserRequest(followUserEvent, authId);
        verify(userRepository, times(2)).findById(any());
        assertEquals(1L, authUser.getFollowerRequests().size());
    }

    @Test
    public void handleFollowUserRequest_shouldUnfollowUser() {
        FollowRequestUserEvent followUserEvent = mockFollowRequestUserEvent(false);
        User user = mockUser(3L);
        User authUser = mockUser(TestConstants.USER_ID);
        authUser.getFollowerRequests().add(user);
        String authId = TestConstants.USER_ID.toString();
        when(userRepository.findById(followUserEvent.getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(parseLong(authId))).thenReturn(Optional.of(authUser));
        userHandlerService.handleFollowUserRequest(followUserEvent, authId);
        verify(userRepository, times(2)).findById(any());
        assertEquals(1L, authUser.getFollowerRequests().size());
    }

    private static User mockUser(Long userId) {
        User user = new User();
        user.setId(userId);
        user.setUsername(TestConstants.USERNAME);
        user.setFullName(TestConstants.FULL_NAME);
        user.setAbout(TestConstants.ABOUT);
        user.setAvatar(TestConstants.AVATAR_SRC_1);
        user.setPrivateProfile(false);
        user.setActive(true);
        return user;
    }

    private static UpdateUserEvent mockUpdateUserEvent() {
        return UpdateUserEvent.builder()
                .id(TestConstants.USER_ID)
                .username(TestConstants.USERNAME)
                .fullName(TestConstants.FULL_NAME)
                .about(TestConstants.ABOUT)
                .avatar(TestConstants.AVATAR_SRC_2)
                .privateProfile(false)
                .active(true)
                .build();
    }

    private static BlockUserEvent mockBlockUserEvent(boolean isUserBlocked) {
        return BlockUserEvent.builder()
                .id(TestConstants.USER_ID)
                .username(TestConstants.USERNAME)
                .fullName(TestConstants.FULL_NAME)
                .about(TestConstants.ABOUT)
                .avatar(TestConstants.AVATAR_SRC_2)
                .privateProfile(false)
                .mutedDirectMessages(false)
                .active(true)
                .userBlocked(isUserBlocked)
                .build();
    }

    private static FollowUserEvent mockFollowUserEvent(boolean isUserFollow) {
        return FollowUserEvent.builder()
                .id(TestConstants.USER_ID)
                .username(TestConstants.USERNAME)
                .fullName(TestConstants.FULL_NAME)
                .about(TestConstants.ABOUT)
                .avatar(TestConstants.AVATAR_SRC_2)
                .privateProfile(false)
                .mutedDirectMessages(false)
                .active(true)
                .userFollow(isUserFollow)
                .build();
    }

    private static FollowRequestUserEvent mockFollowRequestUserEvent(boolean isUserFollowRequest) {
        return FollowRequestUserEvent.builder()
                .id(TestConstants.USER_ID)
                .username(TestConstants.USERNAME)
                .fullName(TestConstants.FULL_NAME)
                .about(TestConstants.ABOUT)
                .avatar(TestConstants.AVATAR_SRC_2)
                .privateProfile(false)
                .mutedDirectMessages(false)
                .active(true)
                .userFollowRequest(isUserFollowRequest)
                .build();
    }
}
