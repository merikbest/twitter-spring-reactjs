package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.client.TweetClient;
import com.gmail.merikbest2015.constants.PathConstants;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.repository.TweetTagRepository;
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
    public TagRepository tagRepository;

    @MockBean
    public TweetTagRepository tweetTagRepository;

    @MockBean
    public TweetClient tweetClient;

    @Before
    public void setUp() {
//        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
//        mockRequest.addHeader(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID);
//        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
    }
}
