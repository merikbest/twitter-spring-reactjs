package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.ScheduledTweetService;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.TWEET_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ScheduledTweetServiceImpl implements ScheduledTweetService {

    private final TweetRepository tweetRepository;
    private final TweetServiceImpl tweetService;
    private final TweetServiceHelper tweetServiceHelper;

    @Override
    public Page<TweetProjection> getScheduledTweets(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getScheduledTweets(authUserId, pageable);
    }

    @Override
    @Transactional
    public TweetProjection createScheduledTweet(Tweet tweet) {
        return tweetService.createNewTweet(tweet);
    }

    @Override
    @Transactional
    public TweetProjection updateScheduledTweet(Tweet tweetInfo) {
        Tweet tweet = tweetRepository.findById(tweetInfo.getId())
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        tweetServiceHelper.checkTweetTextLength(tweetInfo.getText());
        tweet.setText(tweetInfo.getText());
        tweet.setImages(tweetInfo.getImages());
        return tweetService.getTweetById(tweet.getId());
    }

    @Override
    @Transactional
    public String deleteScheduledTweets(List<Long> tweetsIds) {
        tweetsIds.forEach(tweetService::deleteTweet);
        return "Scheduled tweets deleted.";
    }
}
