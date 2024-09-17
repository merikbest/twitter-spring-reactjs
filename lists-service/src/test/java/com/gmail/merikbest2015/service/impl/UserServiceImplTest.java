package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.constants.ErrorMessage;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.ListsErrorMessage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class UserServiceImplTest extends AbstractServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void getAuthUser_shouldReturnUser() {
        User authUser = mockUser();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(authUser));
        assertEquals(authUser, userService.getAuthUser());
    }

    @Test
    public void getAuthUser_shouldThrowUnauthorized() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getAuthUser());
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
    }

    @Test
    public void getUserById_shouldReturnUser() {
        User user = mockUser();
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(user));
        assertEquals(user, userService.getUserById(TestConstants.USER_ID));
    }

    @Test
    public void getUserById_shouldThrowUserNotFound() {
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getUserById(TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void searchListMembersByUsername() {
        List<User> users = List.of(mockUser());
        when(userRepository.searchListMembersByUsername(TestConstants.USERNAME)).thenReturn(users);
        assertEquals(users, userService.searchListMembersByUsername(TestConstants.USERNAME));
    }

    @Test
    public void checkUserIsBlocked_shouldThrowUserIsBlocked() {
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 3L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.checkUserIsBlocked(TestConstants.USER_ID, 3L));
        assertEquals(String.format(ListsErrorMessage.USER_ID_BLOCKED, 3L), exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void checkIsPrivateUserProfile_shouldThrowUserNotFound() {
        when(userRepository.isUserHavePrivateProfile(3L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.checkIsPrivateUserProfile(3L, TestConstants.USER_ID));
        assertEquals(ErrorMessage.USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void isUserBlocked_shouldReturnTrue() {
        when(userRepository.isUserBlocked(TestConstants.USER_ID, 3L)).thenReturn(true);
        assertTrue(userService.isUserBlocked(TestConstants.USER_ID, 3L));
    }

    @Test
    public void isUserHavePrivateProfile_shouldReturnTrue() {
        when(userRepository.isUserHavePrivateProfile(3L, TestConstants.USER_ID)).thenReturn(true);
        assertFalse(userService.isUserHavePrivateProfile(3L, TestConstants.USER_ID));
    }

    private static User mockUser() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        user.setUsername(TestConstants.USERNAME);
        user.setFullName(TestConstants.FULL_NAME);
        user.setAbout(TestConstants.ABOUT);
        user.setAvatar(TestConstants.AVATAR_SRC_1);
        user.setPrivateProfile(false);
        user.setActive(true);
        return user;
    }
}
