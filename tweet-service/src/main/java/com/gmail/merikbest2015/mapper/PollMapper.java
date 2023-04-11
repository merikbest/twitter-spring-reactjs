package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.dto.request.TweetRequest;
import com.gmail.merikbest2015.dto.request.VoteRequest;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PollMapper {

    private final BasicMapper basicMapper;
    private final PollService pollService;

    public TweetResponse createPoll(TweetRequest tweetRequest) {
        Tweet tweet = basicMapper.convertToResponse(tweetRequest, Tweet.class);
        return pollService.createPoll(tweetRequest.getPollDateTime(), tweetRequest.getChoices(), tweet);
    }

    public TweetResponse voteInPoll(VoteRequest voteRequest) {
        TweetProjection tweet = pollService.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollId(),
                voteRequest.getPollChoiceId());
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }
}
