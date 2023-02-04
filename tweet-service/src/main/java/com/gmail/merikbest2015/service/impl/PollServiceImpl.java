package com.gmail.merikbest2015.service.impl;

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
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService {

    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final PollChoiceVotedRepository pollChoiceVotedRepository;
    private final TweetServiceImpl tweetService;
    private final TweetServiceHelper tweetServiceHelper;
    private final TweetRepository tweetRepository;

    @Override
    @Transactional
    public TweetProjection createPoll(Long pollDateTime, List<String> choices, Tweet tweet) {
        if (choices.size() < 2 || choices.size() > 4) {
            throw new ApiRequestException("Incorrect poll choices", HttpStatus.BAD_REQUEST);
        }
        Tweet createdTweet = tweetService.createTweet(tweet);
        LocalDateTime dateTime = LocalDateTime.now().plusMinutes(pollDateTime);
        Poll poll = new Poll();
        poll.setTweet(createdTweet);
        poll.setDateTime(dateTime);
        List<PollChoice> pollChoices = new ArrayList<>();
        choices.forEach(choice -> {
            if (choice.length() == 0 || choice.length() > 25) {
                throw new ApiRequestException("Incorrect choice text length", HttpStatus.BAD_REQUEST);
            }
            PollChoice pollChoice = new PollChoice();
            pollChoice.setChoice(choice);
            pollChoiceRepository.save(pollChoice);
            pollChoices.add(pollChoice);
        });
        poll.setPollChoices(pollChoices);
        pollRepository.save(poll);
        createdTweet.setPoll(poll);
        return tweetService.getTweetById(createdTweet.getId());
    }

    @Override
    @Transactional
    public TweetProjection voteInPoll(Long tweetId, Long pollId, Long pollChoiceId) {
        Tweet tweet = tweetRepository.getTweetByPollIdAndTweetId(tweetId, pollId)
                .orElseThrow(() -> new ApiRequestException("Poll in tweet not exist", HttpStatus.NOT_FOUND));
        tweetServiceHelper.checkIsValidUserProfile(tweet.getAuthorId());
        Poll poll = pollRepository.getPollByPollChoiceId(pollId, pollChoiceId)
                .orElseThrow(() -> new ApiRequestException("Poll choice not found", HttpStatus.NOT_FOUND));

        if (LocalDateTime.now().isAfter(poll.getDateTime())) {
            throw new ApiRequestException("Poll is not available", HttpStatus.BAD_REQUEST);
        }
        Long userId = AuthUtil.getAuthenticatedUserId();
        boolean ifUserVoted = pollChoiceVotedRepository.ifUserVoted(userId, pollChoiceId);

        if (ifUserVoted) {
            throw new ApiRequestException("User voted in poll", HttpStatus.BAD_REQUEST);
        }
        PollChoiceVoted votedUser = new PollChoiceVoted(userId, pollChoiceId);
        pollChoiceVotedRepository.save(votedUser);
        return tweetService.getTweetById(tweetId);
    }
}
