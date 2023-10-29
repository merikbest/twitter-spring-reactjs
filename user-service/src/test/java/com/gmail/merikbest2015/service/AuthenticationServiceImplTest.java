package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.amqp.AmqpProducer;
import com.gmail.merikbest2015.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.repository.projection.UserCommonProjection;
import com.gmail.merikbest2015.repository.projection.UserPrincipalProjection;
import com.gmail.merikbest2015.security.JwtProvider;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.EMAIL_NOT_FOUND;
import static com.gmail.merikbest2015.constants.ErrorMessage.USER_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class AuthenticationServiceImplTest extends AbstractAuthTest {

    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private UserServiceHelper userServiceHelper;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private JwtProvider jwtProvider;

    @MockBean
    private AmqpProducer amqpProducer;

    @Test
    public void getAuthenticatedUser_ShouldReturnAuthenticatedUser() {
        User user = new User();
        when(userRepository.findById(any())).thenReturn(Optional.of(user));
        assertEquals(user, authenticationService.getAuthenticatedUser());
        verify(userRepository, times(1)).findById(any());
    }

    @Test
    public void getAuthenticatedUser_ShouldThrowUserNotFoundException() {
        when(userRepository.findById(any())).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> authenticationService.getAuthenticatedUser());
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserPrincipalByEmail_ShouldReturnAuthenticatedUser() {
        UserPrincipalProjection userPrincipalProjection = UserServiceTestHelper.createUserPrincipalProjection();
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, UserPrincipalProjection.class))
                .thenReturn(Optional.of(userPrincipalProjection));
        assertEquals(userPrincipalProjection, authenticationService.getUserPrincipalByEmail(TestConstants.USER_EMAIL));
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, UserPrincipalProjection.class);
    }

    @Test
    public void getUserPrincipalByEmail_ShouldThrowUserNotFoundException() {
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, UserPrincipalProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> authenticationService.getUserPrincipalByEmail(TestConstants.USER_EMAIL));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void login_ShouldReturnAuthenticatedUser() {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        BindingResult bindingResult = mock(BindingResult.class);
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        Map<String, Object> userMap = Map.of("user", authUserProjection, "token", TestConstants.AUTH_TOKEN);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, AuthUserProjection.class))
                .thenReturn(Optional.of(authUserProjection));
        when(jwtProvider.createToken(TestConstants.USER_EMAIL,"USER")).thenReturn(TestConstants.AUTH_TOKEN);
        assertEquals(userMap, authenticationService.login(request, bindingResult));
        verify(userServiceHelper, times(1)).processInputErrors(bindingResult);
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, AuthUserProjection.class);
        verify(jwtProvider, times(1)).createToken(TestConstants.USER_EMAIL,"USER");
    }

    @Test
    public void login_ShouldThrowUserNotFoundException() {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        BindingResult bindingResult = mock(BindingResult.class);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, AuthUserProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> authenticationService.login(request, bindingResult));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserByToken_ShouldReturnAuthUserProjection() {
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        Map<String, Object> userMap = Map.of("user", authUserProjection, "token", TestConstants.AUTH_TOKEN);
        when(userRepository.getUserById(any(), AuthUserProjection.class))
                .thenReturn(Optional.of(authUserProjection));
        when(jwtProvider.createToken(TestConstants.USER_EMAIL,"USER")).thenReturn(TestConstants.AUTH_TOKEN);
        assertEquals(userMap, authenticationService.getUserByToken());
        verify(userRepository, times(1)).getUserById(any(), AuthUserProjection.class);
        verify(jwtProvider, times(1)).createToken(TestConstants.USER_EMAIL,"USER");
    }

    @Test
    public void getUserByToken_ShouldThrowUserNotFoundException() {
        when(userRepository.getUserById(any(), AuthUserProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> authenticationService.getUserByToken());
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getExistingEmail_ShouldReturnSuccessMessage() {
        BindingResult bindingResult = mock(BindingResult.class);
        UserCommonProjection userCommonProjection = UserServiceTestHelper.createUserCommonProjection();
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, UserCommonProjection.class))
                .thenReturn(Optional.of(userCommonProjection));
        assertEquals("Reset password code is send to your E-mail",
                authenticationService.getExistingEmail(TestConstants.USER_EMAIL, bindingResult));
        verify(userServiceHelper, times(1)).processInputErrors(bindingResult);
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, UserCommonProjection.class);
    }

    @Test
    public void getExistingEmail_ShouldThrowEmailNotFoundException() {
        BindingResult bindingResult = mock(BindingResult.class);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, UserCommonProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> authenticationService.getExistingEmail(TestConstants.USER_EMAIL, bindingResult));
        assertEquals(EMAIL_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
