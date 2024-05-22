package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.broker.producer.UserNotificationProducer;
import com.gmail.merikbest2015.client.TweetClient;
import com.gmail.merikbest2015.client.UserClient;
import com.gmail.merikbest2015.client.WebSocketClient;
import com.gmail.merikbest2015.constants.PathConstants;
import com.gmail.merikbest2015.mapper.NotificationHandlerMapper;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@SpringBootTest
@RunWith(SpringRunner.class)
public abstract class AbstractServiceTest {

    @MockBean
    public NotificationRepository notificationRepository;

    @MockBean
    public UserNotificationProducer userNotificationProducer;

    @MockBean
    public NotificationHandlerMapper notificationHandlerMapper;

    @MockBean
    public ListsRepository listsRepository;

    @MockBean
    public TweetRepository tweetRepository;

    @MockBean
    public UserRepository userRepository;

    @MockBean
    public TweetClient tweetClient;

    @MockBean
    public UserClient userClient;

    @MockBean
    public WebSocketClient webSocketClient;

    @Before
    public void setUp() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.addHeader(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
    }
}
