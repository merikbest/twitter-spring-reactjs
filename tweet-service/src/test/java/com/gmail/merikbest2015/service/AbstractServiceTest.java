package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.broker.producer.TagProducer;
import com.gmail.merikbest2015.broker.producer.TweetNotificationProducer;
import com.gmail.merikbest2015.broker.producer.UpdateTweetCountProducer;
import com.gmail.merikbest2015.constants.PathConstants;
import com.gmail.merikbest2015.client.ListsClient;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.*;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public abstract class AbstractServiceTest {

    @MockBean
    public BookmarkRepository bookmarkRepository;

    @MockBean
    public UserRepository userRepository;

    @MockBean
    public TweetRepository tweetRepository;

    @MockBean
    public LikeTweetRepository likeTweetRepository;

    @MockBean
    public PollRepository pollRepository;

    @MockBean
    public PollChoiceRepository pollChoiceRepository;

    @MockBean
    public PollChoiceVotedRepository pollChoiceVotedRepository;

    @MockBean
    public RetweetRepository retweetRepository;

    @MockBean
    public ListsClient listsClient;

    @MockBean
    public BasicMapper basicMapper;

    @MockBean
    public TweetNotificationProducer tweetNotificationProducer;

    @MockBean
    public UpdateTweetCountProducer updateTweetCountProducer;

    @MockBean
    public TagProducer tagProducer;

    public static final PageRequest pageable = PageRequest.of(0, 20);
    public static final List<Long> ids = List.of(1L, 2L, 3L);

    @Before
    public void setUp() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.addHeader(PathConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
    }
}
