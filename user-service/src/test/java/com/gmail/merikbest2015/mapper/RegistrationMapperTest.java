package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.request.EndRegistrationRequest;
import com.gmail.merikbest2015.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.service.RegistrationService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.validation.BindingResult;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RegistrationMapperTest extends AbstractAuthTest {

    @Autowired
    private RegistrationMapper registrationMapper;

    @MockBean
    private RegistrationService registrationService;

    @MockBean
    private AuthenticationMapper authenticationMapper;

    private final BindingResult bindingResult = mock(BindingResult.class);

    @Test
    public void registration() {
        RegistrationRequest request = new RegistrationRequest();
        request.setBirthday(TestConstants.BIRTHDAY);
        request.setEmail(TestConstants.USER_EMAIL);
        request.setUsername(TestConstants.USERNAME);
        when(registrationService.registration(request, bindingResult)).thenReturn("User data checked.");
        assertEquals("User data checked.", registrationMapper.registration(request, bindingResult));
        verify(registrationService, times(1)).registration(request, bindingResult);
    }

    @Test
    public void sendRegistrationCode() {
        when(registrationService.sendRegistrationCode(TestConstants.USER_EMAIL, bindingResult)).thenReturn("Registration code sent successfully");
        assertEquals("Registration code sent successfully", registrationMapper.sendRegistrationCode(TestConstants.USER_EMAIL, bindingResult));
        verify(registrationService, times(1)).sendRegistrationCode(TestConstants.USER_EMAIL, bindingResult);
    }

    @Test
    public void checkRegistrationCode() {
        when(registrationService.checkRegistrationCode(TestConstants.ACTIVATION_CODE)).thenReturn("User successfully activated.");
        assertEquals("User successfully activated.", registrationMapper.checkRegistrationCode(TestConstants.ACTIVATION_CODE));
        verify(registrationService, times(1)).checkRegistrationCode(TestConstants.ACTIVATION_CODE);
    }

    @Test
    public void endRegistration() {
        EndRegistrationRequest request = new EndRegistrationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        request.setPassword(TestConstants.PASSWORD);
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        Map<String, Object> user = Map.of("user", authUserProjection, "token", TestConstants.AUTH_TOKEN);
        AuthenticationResponse response = new AuthenticationResponse();
        when(registrationService.endRegistration(TestConstants.USER_EMAIL, TestConstants.PASSWORD, bindingResult)).thenReturn(user);
        when(authenticationMapper.getAuthenticationResponse(user)).thenReturn(response);
        assertEquals(response, registrationMapper.endRegistration(request, bindingResult));
        verify(registrationService, times(1)).endRegistration(TestConstants.USER_EMAIL, TestConstants.PASSWORD, bindingResult);
        verify(authenticationMapper, times(1)).getAuthenticationResponse(user);
    }
}
