package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Poll;
import com.gmail.merikbest2015.model.PollChoice;
import com.gmail.merikbest2015.model.PollChoiceVoted;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.PollChoiceRepository;
import com.gmail.merikbest2015.repository.PollChoiceVotedRepository;
import com.gmail.merikbest2015.repository.PollRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.PollService;
import com.gmail.merikbest2015.service.util.TweetValidationHelper;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService {

    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final PollChoiceVotedRepository pollChoiceVotedRepository;
    private final TweetServiceImpl tweetService;
    private final TweetServiceHelper tweetServiceHelper;
    private final TweetValidationHelper tweetValidationHelper;
    private final TweetRepository tweetRepository;

    @Override
    @Transactional
    public TweetResponse createPoll(Long pollDateTime, List<String> choices, Tweet tweet) {
        if (choices.size() < 2 || choices.size() > 4) {
            throw new ApiRequestException(INCORRECT_POLL_CHOICES, HttpStatus.BAD_REQUEST);
        }
        TweetResponse tweetResponse = tweetServiceHelper.createTweet(tweet);
        Poll poll = new Poll();
        poll.setTweet(tweet);
        poll.setDateTime(LocalDateTime.now().plusMinutes(pollDateTime));
        List<PollChoice> pollChoices = new ArrayList<>();
        choices.forEach(choice -> {
            if (choice.length() == 0 || choice.length() > 25) {
                throw new ApiRequestException(INCORRECT_CHOICE_TEXT_LENGTH, HttpStatus.BAD_REQUEST);
            }
            PollChoice pollChoice = new PollChoice(choice);
            pollChoiceRepository.save(pollChoice);
            pollChoices.add(pollChoice);
        });
        poll.setPollChoices(pollChoices);
        pollRepository.save(poll);
        tweet.setPoll(poll);
        return tweetResponse;
    }

    @Override
    @Transactional
    public TweetProjection voteInPoll(Long tweetId, Long pollId, Long pollChoiceId) {
        Tweet tweet = tweetRepository.getTweetByPollIdAndTweetId(tweetId, pollId)
                .orElseThrow(() -> new ApiRequestException(POLL_NOT_FOUND, HttpStatus.NOT_FOUND));
        tweetValidationHelper.checkIsValidUserProfile(tweet.getAuthorId());
        Poll poll = pollRepository.getPollByPollChoiceId(pollId, pollChoiceId)
                .orElseThrow(() -> new ApiRequestException(POLL_CHOICE_NOT_FOUND, HttpStatus.NOT_FOUND));

        if (LocalDateTime.now().isAfter(poll.getDateTime())) {
            throw new ApiRequestException(POLL_IS_NOT_AVAILABLE, HttpStatus.BAD_REQUEST);
        }
        Long userId = AuthUtil.getAuthenticatedUserId();
        boolean ifUserVoted = pollChoiceVotedRepository.ifUserVoted(userId, pollChoiceId);

        if (ifUserVoted) {
            throw new ApiRequestException(USER_VOTED_IN_POLL, HttpStatus.BAD_REQUEST);
        }
        PollChoiceVoted votedUser = new PollChoiceVoted(userId, pollChoiceId);
        pollChoiceVotedRepository.save(votedUser);
        return tweetService.getTweetById(tweetId);
    }
}
