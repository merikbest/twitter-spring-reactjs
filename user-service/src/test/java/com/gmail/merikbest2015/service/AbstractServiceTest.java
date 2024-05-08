package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.constants.PathConstants;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.kafka.producer.FollowRequestUserProducer;
import com.gmail.merikbest2015.kafka.producer.FollowUserProducer;
import com.gmail.merikbest2015.kafka.producer.SendEmailProducer;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.*;
import com.gmail.merikbest2015.security.JwtProvider;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public abstract class AbstractServiceTest {

    @MockBean
    protected UserRepository userRepository;

    @MockBean
    protected BlockUserRepository blockUserRepository;

    @MockBean
    protected FollowerUserRepository followerUserRepository;

    @MockBean
    protected MuteUserRepository muteUserRepository;

    @MockBean
    protected UserSettingsRepository userSettingsRepository;

    @MockBean
    protected NotificationClient notificationClient;

    @MockBean
    protected FollowUserProducer followUserProducer;

    @MockBean
    protected FollowRequestUserProducer followRequestUserProducer;

    @MockBean
    protected JwtProvider jwtProvider;

    @MockBean
    protected SendEmailProducer sendEmailProducer;

    @MockBean
    protected PasswordEncoder passwordEncoder;

    @MockBean
    protected BasicMapper basicMapper;

    @MockBean
    protected AuthenticationService authenticationService;

    protected static final PageRequest pageable = PageRequest.of(0, 20);
    protected static final List<Long> ids = List.of(1L, 2L, 3L);

    @Before
    public void setUp() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.addHeader(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
    }
}
