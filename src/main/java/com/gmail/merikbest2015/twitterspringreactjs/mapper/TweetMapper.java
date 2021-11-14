package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TweetMapper {

    private final ModelMapper modelMapper;
    private final TweetService tweetService;
    @Lazy
    private final UserMapper userMapper;

    private Tweet convertToTweetEntity(TweetRequest tweetRequest) {
        return modelMapper.map(tweetRequest, Tweet.class);
    }

    protected TweetResponse convertToTweetResponse(Tweet tweet) {
        return modelMapper.map(tweet, TweetResponse.class);
    }

    public List<TweetResponse> convertListToResponse(List<Tweet> tweets) {
        return tweets.stream()
                .map(this::convertToTweetResponse)
                .collect(Collectors.toList());
    }

    private TweetHeaderResponse getTweetHeaderResponse(Page<Tweet> tweets) {
        List<TweetResponse> tweetResponses = convertListToResponse(tweets.getContent());
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(tweets.getTotalPages()));
        return new TweetHeaderResponse(tweetResponses, responseHeaders);
    }

    public TweetHeaderResponse getTweets(Pageable pageable) {
        return getTweetHeaderResponse(tweetService.getTweets(pageable));
    }

    public TweetHeaderResponse getMediaTweets(Pageable pageable) {
        return getTweetHeaderResponse(tweetService.getMediaTweets(pageable));
    }

    public TweetHeaderResponse getTweetsWithVideo(Pageable pageable) {
        return getTweetHeaderResponse(tweetService.getTweetsWithVideo(pageable));
    }

    public List<TweetResponse> getScheduledTweets() {
        return convertListToResponse(tweetService.getScheduledTweets());
    }

    public TweetResponse getTweetById(Long tweetId) {
        return convertToTweetResponse(tweetService.getTweetById(tweetId));
    }

    public TweetResponse createTweet(TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.createTweet(convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse createPoll(TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.createPoll(tweetRequest.getPollDateTime(), tweetRequest.getChoices(),
                convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse updateScheduledTweet(TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.updateScheduledTweet(convertToTweetEntity(tweetRequest)));
    }

    public String deleteScheduledTweets(TweetDeleteRequest tweetRequest) {
        return tweetService.deleteScheduledTweets(tweetRequest.getTweetsIds());
    }

    public TweetResponse deleteTweet(Long tweetId) {
        TweetResponse tweetResponse = convertToTweetResponse(tweetService.deleteTweet(tweetId));
        tweetResponse.setTweetDeleted(true);
        return tweetResponse;
    }

    public NotificationResponse likeTweet(Long tweetId) {
        return userMapper.convertToNotificationResponse(tweetService.likeTweet(tweetId));
    }

    public NotificationResponse retweet(Long tweetId) {
        return userMapper.convertToNotificationResponse(tweetService.retweet(tweetId));
    }

    public List<TweetResponse> searchTweets(String text) {
        return convertListToResponse(tweetService.searchTweets(text));
    }

    public TweetResponse replyTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.replyTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse quoteTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.quoteTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse changeTweetReplyType(Long tweetId, ReplyType replyType) {
        return convertToTweetResponse(tweetService.changeTweetReplyType(tweetId, replyType));
    }

    public TweetResponse voteInPoll(VoteRequest voteRequest) {
        return convertToTweetResponse(tweetService.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollChoiceId()));
    }
}
