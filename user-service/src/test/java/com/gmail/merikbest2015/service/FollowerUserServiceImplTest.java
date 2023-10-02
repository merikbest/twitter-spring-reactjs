package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.repository.BlockUserRepository;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.MuteUserRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.BaseUserProjection;
import com.gmail.merikbest2015.repository.projection.FollowerUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.impl.FollowerUserServiceImpl;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import lombok.SneakyThrows;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.function.Executable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FollowerUserServiceImplTest extends AbstractAuthTest {

    @Autowired
    private FollowerUserServiceImpl followerUserService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BlockUserRepository blockUserRepository;

    @MockBean
    private MuteUserRepository muteUserRepository;

    @MockBean
    private FollowerUserRepository followerUserRepository;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private NotificationClient notificationClient;

    private static final Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();

    @Before
    public void setUp() {
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
    }

    @Test
    public void getFollowers_ShouldReturnUserProjections() {
        when(followerUserRepository.getFollowersById(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        testReturnUserProjections(() -> followerUserService.getFollowers(TestConstants.USER_ID, pageable));
        verify(followerUserRepository, times(1)).getFollowersById(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getFollowers_ShouldThrowUserNotFound() {
        testThrowUserNotFound(() -> followerUserService.getFollowers(1L, pageable));
    }

    @Test
    public void getFollowers_ShouldThrowUserProfileBLocked() {
        testThrowUserProfileBlocked(() -> followerUserService.getFollowers(1L, pageable));
    }

    @Test
    public void getFollowers_ShouldThrowUserHavePrivateProfile() {
        testThrowUserHavePrivateProfile(() -> followerUserService.getFollowers(1L, pageable));
    }

    @SneakyThrows
    private void testReturnUserProjections(Executable executable) {
        when(userRepository.isUserExist(TestConstants.USER_ID)).thenReturn(true);
        executable.execute();
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).isUserExist(TestConstants.USER_ID);
    }

    private void testThrowUserNotFound(Executable executable) {
        when(userRepository.isUserExist(1L)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class, executable);
        assertEquals(String.format(USER_ID_NOT_FOUND, 1L), exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(userRepository, times(1)).isUserExist(1L);
    }

    private void testThrowUserProfileBlocked(Executable executable) {
        when(userRepository.isUserExist(1L)).thenReturn(true);
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        when(blockUserRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class, executable);
        assertEquals(USER_PROFILE_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    private void testThrowUserHavePrivateProfile(Executable executable) {
        when(userRepository.isUserExist(1L)).thenReturn(true);
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        when(blockUserRepository.isUserBlocked(1L, TestConstants.USER_ID)).thenReturn(false);
        when(userRepository.isUserHavePrivateProfile(1L, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class, executable);
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
