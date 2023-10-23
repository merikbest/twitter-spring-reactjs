package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.UserProfileProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.impl.UserServiceImpl;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.INCORRECT_USERNAME_LENGTH;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class UserServiceImplTest extends AbstractAuthTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private UserServiceHelper userServiceHelper;

    @MockBean
    private TweetClient tweetClient;

    @MockBean
    private TagClient tagClient;

    @Test
    public void getUserById_ShouldReturnUserProfileProjection() {
        UserProfileProjection userProfileProjection = UserServiceTestHelper.createUserProfileProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, UserProfileProjection.class))
                .thenReturn(Optional.of(userProfileProjection));
        assertEquals(userProfileProjection, userService.getUserById(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, UserProfileProjection.class);
    }

    @Test
    public void getUserById_ShouldThrowUserNotFoundException() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getUserById(TestConstants.USER_ID));
        assertEquals(INCORRECT_USERNAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUsers_ShouldReturnUserProjectionList() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        when(userRepository.findByActiveTrueAndIdNot(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, userService.getUsers(pageable));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).findByActiveTrueAndIdNot(TestConstants.USER_ID, pageable);
    }
}
