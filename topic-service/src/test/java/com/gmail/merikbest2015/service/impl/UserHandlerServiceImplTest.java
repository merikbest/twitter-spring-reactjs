package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.TopicTestHelper;
import com.gmail.merikbest2015.event.BlockUserEvent;
import com.gmail.merikbest2015.event.FollowUserEvent;
import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.event.UserEvent;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserHandlerService;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.gmail.merikbest2015.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserHandlerServiceImplTest {

    @Autowired
    private UserHandlerService userHandlerService;

    @MockBean
    private UserRepository userRepository;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void handleUpdateUser_updateUser() {
        User authUser = TopicTestHelper.mockAuthUser();
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        assertFalse(authUser.isPrivateProfile());
        userHandlerService.handleUpdateUser(mockUpdateUserEvent());
        assertTrue(authUser.isPrivateProfile());
    }

    @Test
    public void handleUpdateUser_createUser() {
        UpdateUserEvent updateUserEvent = mockUpdateUserEvent();
        User user = mockCreateUser(updateUserEvent);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());
        userHandlerService.handleUpdateUser(updateUserEvent);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void handleBlockUser_blockUser() {
        BlockUserEvent blockUserEvent = mockBlockUserEvent(true);
        User user = mockCreateUser(blockUserEvent);
        User authUser = TopicTestHelper.mockAuthUser();
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        userHandlerService.handleBlockUser(blockUserEvent, USER_ID.toString());
        assertTrue(authUser.getUserBlockedList().contains(user));
    }

    @Test
    public void handleBlockUser_unblockUser() {
        BlockUserEvent blockUserEvent = mockBlockUserEvent(false);
        User user = mockCreateUser(blockUserEvent);
        User authUser = TopicTestHelper.mockAuthUser();
        authUser.setUserBlockedList(new HashSet<>(Set.of(user)));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        userHandlerService.handleBlockUser(blockUserEvent, USER_ID.toString());
        assertTrue(authUser.getUserBlockedList().isEmpty());
    }

    @Test
    public void handleFollowUser_followUser() {
        FollowUserEvent followUserEvent = mockFollowUserEvent(true);
        User user = mockCreateUser(followUserEvent);
        User authUser = TopicTestHelper.mockAuthUser();
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        userHandlerService.handleFollowUser(followUserEvent, USER_ID.toString());
        assertTrue(authUser.getFollowers().contains(user));
    }

    @Test
    public void handleFollowUser_unfollowUser() {
        FollowUserEvent followUserEvent = mockFollowUserEvent(false);
        User user = mockCreateUser(followUserEvent);
        User authUser = TopicTestHelper.mockAuthUser();
        authUser.setFollowers(new HashSet<>(Set.of(user)));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        userHandlerService.handleFollowUser(followUserEvent, USER_ID.toString());
        assertTrue(authUser.getFollowers().isEmpty());
    }

    private static UpdateUserEvent mockUpdateUserEvent() {
        return UpdateUserEvent.builder()
                .id(USER_ID)
                .fullName(FULL_NAME)
                .username(USERNAME)
                .privateProfile(true)
                .build();
    }

    private static BlockUserEvent mockBlockUserEvent(boolean userBlocked) {
        return BlockUserEvent.builder()
                .id(USER_ID)
                .fullName(FULL_NAME)
                .username(USERNAME)
                .privateProfile(false)
                .userBlocked(userBlocked)
                .build();
    }

    private static FollowUserEvent mockFollowUserEvent(boolean userFollow) {
        return FollowUserEvent.builder()
                .id(USER_ID)
                .fullName(FULL_NAME)
                .username(USERNAME)
                .privateProfile(false)
                .userFollow(userFollow)
                .build();
    }

    private static User mockCreateUser(UserEvent userEvent) {
        User newUser = new User();
        newUser.setId(userEvent.getId());
        newUser.setUsername(userEvent.getUsername());
        newUser.setFullName(userEvent.getFullName());
        newUser.setPrivateProfile(userEvent.isPrivateProfile());
        return newUser;
    }
}
