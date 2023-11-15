package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.validation.BindingResult;

import java.util.Map;

import static org.mockito.Mockito.*;

public class AuthenticationMapperTest extends AbstractAuthTest {

    @Autowired
    private AuthenticationMapper authenticationMapper;

    @MockBean
    private AuthenticationService authenticationService;

    @Test
    public void login() {
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        BindingResult bindingResult = mock(BindingResult.class);
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail(TestConstants.USER_EMAIL);
        Map<String, Object> credentials = Map.of(
                "user", authUserProjection,
                "token", TestConstants.AUTH_TOKEN);
        when(authenticationService.login(request, bindingResult)).thenReturn(credentials);
        authenticationMapper.login(request, bindingResult);
        verify(authenticationService, times(1)).login(request, bindingResult);
    }
}
