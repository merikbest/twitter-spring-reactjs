package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.amqp.AmqpProducer;
import com.gmail.merikbest2015.dto.request.EmailRequest;
import com.gmail.merikbest2015.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.repository.projection.UserCommonProjection;
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

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class RegistrationServiceImplTest extends AbstractAuthTest {

    @Autowired
    private RegistrationService registrationService;

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
    BindingResult bindingResult = mock(BindingResult.class);

    @Test
    public void registration_ShouldReturnSuccessMessage() {
        User user = new User();
        user.setEmail(TestConstants.USER_EMAIL);
        user.setUsername(TestConstants.USERNAME);
        user.setFullName(TestConstants.USERNAME);
        user.setBirthday(TestConstants.BIRTHDAY);
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        request.setUsername(TestConstants.USERNAME);
        request.setBirthday(TestConstants.BIRTHDAY);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, User.class)).thenReturn(Optional.empty());
        assertEquals("User data checked.", registrationService.registration(request, bindingResult));
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, User.class);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void registrationExistedUser_ShouldReturnSuccessMessage() {
        User user = new User();
        user.setEmail(TestConstants.USER_EMAIL);
        user.setUsername(TestConstants.USERNAME);
        user.setFullName(TestConstants.USERNAME);
        user.setBirthday(TestConstants.BIRTHDAY);
        user.setActive(false);
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        request.setUsername(TestConstants.USERNAME);
        request.setBirthday(TestConstants.BIRTHDAY);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, User.class)).thenReturn(Optional.of(user));
        assertEquals("User data checked.", registrationService.registration(request, bindingResult));
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, User.class);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void registrationExistedUser_ShouldThrowEmailHasAlreadyBeenTakenException() {
        User user = new User();
        user.setEmail(TestConstants.USER_EMAIL);
        user.setUsername(TestConstants.USERNAME);
        user.setFullName(TestConstants.USERNAME);
        user.setBirthday(TestConstants.BIRTHDAY);
        user.setActive(true);
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        request.setUsername(TestConstants.USERNAME);
        request.setBirthday(TestConstants.BIRTHDAY);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, User.class)).thenReturn(Optional.of(user));
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> registrationService.registration(request, bindingResult));
        assertEquals(EMAIL_HAS_ALREADY_BEEN_TAKEN, exception.getMessage());
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
    }

    @Test
    public void sendRegistrationCode_ShouldReturnSuccessMessage() {
        UserCommonProjection userCommonProjection = UserServiceTestHelper.createUserCommonProjection();
        EmailRequest request = EmailRequest.builder()
                .to(userCommonProjection.getEmail())
                .subject("Registration code")
                .template("registration-template")
                .attributes(Map.of(
                        "fullName", userCommonProjection.getFullName(),
                        "registrationCode", TestConstants.ACTIVATION_CODE))
                .build();
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, UserCommonProjection.class))
                .thenReturn(Optional.of(userCommonProjection));
        when(userRepository.getActivationCode(userCommonProjection.getId()))
                .thenReturn(TestConstants.ACTIVATION_CODE);
        assertEquals("Registration code sent successfully",
                registrationService.sendRegistrationCode(TestConstants.USER_EMAIL, bindingResult));
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, UserCommonProjection.class);
        verify(userRepository, times(1)).getActivationCode(userCommonProjection.getId());
        verify(amqpProducer, times(1)).sendEmail(request);
    }

    @Test
    public void sendRegistrationCode_ShouldThrowUserNotFound() {
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, UserCommonProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> registrationService.sendRegistrationCode(TestConstants.USER_EMAIL, bindingResult));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void checkRegistrationCode_ShouldReturnSuccessMessage() {
        UserCommonProjection userCommonProjection = UserServiceTestHelper.createUserCommonProjection();
        when(userRepository.getCommonUserByActivationCode(TestConstants.ACTIVATION_CODE))
                .thenReturn(Optional.of(userCommonProjection));
        assertEquals("User successfully activated.",
                registrationService.checkRegistrationCode(TestConstants.ACTIVATION_CODE));
        verify(userRepository, times(1)).getCommonUserByActivationCode(TestConstants.ACTIVATION_CODE);
        verify(userRepository, times(1)).updateActivationCode(null, userCommonProjection.getId());
    }

    @Test
    public void checkRegistrationCode_ShouldThrowActivationCodeNotFound() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> registrationService.checkRegistrationCode(TestConstants.ACTIVATION_CODE));
        assertEquals(ACTIVATION_CODE_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void endRegistration_ShouldReturnSuccessMessage() {
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        Map<String, Object> userMap = Map.of("user", authUserProjection, "token", TestConstants.AUTH_TOKEN);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, AuthUserProjection.class))
                .thenReturn(Optional.of(authUserProjection));
        when(passwordEncoder.encode(TestConstants.PASSWORD)).thenReturn(TestConstants.PASSWORD);
        when(jwtProvider.createToken(TestConstants.USER_EMAIL, "USER"))
                .thenReturn(TestConstants.AUTH_TOKEN);
        assertEquals(userMap, registrationService.endRegistration(TestConstants.USER_EMAIL, TestConstants.PASSWORD,
                bindingResult));
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, AuthUserProjection.class);
        verify(userRepository, times(1)).updatePassword(TestConstants.PASSWORD, authUserProjection.getId());
        verify(userRepository, times(1)).updateActiveUserProfile(authUserProjection.getId());
        verify(jwtProvider, times(1)).createToken(TestConstants.USER_EMAIL, "USER");
    }

    @Test
    public void endRegistration_ShouldThrowPasswordLengthException() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> registrationService.endRegistration(TestConstants.USER_EMAIL, "", bindingResult));
        assertEquals(PASSWORD_LENGTH_ERROR, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
