package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.TweetServiceTestHelper;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Poll;
import com.gmail.merikbest2015.model.PollChoice;
import com.gmail.merikbest2015.model.PollChoiceVoted;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.PollChoiceRepository;
import com.gmail.merikbest2015.repository.PollChoiceVotedRepository;
import com.gmail.merikbest2015.repository.PollRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.impl.PollServiceImpl;
import com.gmail.merikbest2015.service.impl.TweetServiceImpl;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class PollServiceImplTest {

    @Autowired
    private PollServiceImpl pollService;

    @MockBean
    private PollRepository pollRepository;

    @MockBean
    private PollChoiceRepository pollChoiceRepository;

    @MockBean
    private PollChoiceVotedRepository pollChoiceVotedRepository;

    @MockBean
    private TweetServiceImpl tweetService;

    @MockBean
    private TweetServiceHelper tweetServiceHelper;

    @MockBean
    private TweetRepository tweetRepository;

    @MockBean
    private UserClient userClient;

    private static Tweet tweet;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
        tweet = new Tweet();
        tweet.setAuthorId(TestConstants.USER_ID);
    }

    @Test
    public void createPoll() {
        List<String> choices = Arrays.asList(TestConstants.POLL_CHOICE_1, TestConstants.POLL_CHOICE_2);
        List<PollChoice> pollChoices = Arrays.asList(new PollChoice(TestConstants.POLL_CHOICE_1), new PollChoice(TestConstants.POLL_CHOICE_2));
        when(tweetServiceHelper.createTweet(new Tweet())).thenReturn(new TweetResponse());
        assertEquals(new TweetResponse(), pollService.createPoll(123L, choices, new Tweet()));
        verify(pollChoiceRepository, times(2)).save(new PollChoice(TestConstants.POLL_CHOICE_1));
        verify(pollChoiceRepository, times(2)).save(new PollChoice(TestConstants.POLL_CHOICE_2));
        verify(pollRepository, times(1)).save(new Poll(LocalDateTime.now().plusMinutes(123L), new Tweet(), pollChoices));
        verify(tweetServiceHelper, times(1)).createTweet(new Tweet());
    }

    @Test
    public void createPoll_ShouldIncorrectPollChoices() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> pollService.createPoll(123L, List.of(TestConstants.POLL_CHOICE_1), new Tweet()));
        assertEquals(INCORRECT_POLL_CHOICES, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void createPoll_ShouldIncorrectPollChoiceTextLength() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> pollService.createPoll(123L, Arrays.asList("", TestConstants.POLL_CHOICE_2), new Tweet()));
        assertEquals(INCORRECT_CHOICE_TEXT_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
