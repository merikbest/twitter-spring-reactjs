package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.amqp.AmqpProducer;
import com.gmail.merikbest2015.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.security.JwtProvider;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
        BindingResult bindingResult = mock(BindingResult.class);
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
        BindingResult bindingResult = mock(BindingResult.class);
        when(userRepository.getUserByEmail(TestConstants.USER_EMAIL, User.class)).thenReturn(Optional.of(user));
        assertEquals("User data checked.", registrationService.registration(request, bindingResult));
        verify(userRepository, times(1)).getUserByEmail(TestConstants.USER_EMAIL, User.class);
        verify(userRepository, times(1)).save(user);
    }
}
