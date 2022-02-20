package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TweetMapper {

    private final ModelMapper modelMapper;
    private final TweetService tweetService;

    private Tweet convertToTweetEntity(TweetRequest tweetRequest) {
        return modelMapper.map(tweetRequest, Tweet.class);
    }

    TweetProjectionResponse convertToProjectionResponse(TweetProjection tweet) {
        return modelMapper.map(tweet, TweetProjectionResponse.class);
    }

    List<TweetProjectionResponse> convertListToProjectionResponse(List<TweetProjection> tweets) {
        return tweets.stream()
                .map(this::convertToProjectionResponse)
                .collect(Collectors.toList());
    }

    TweetHeaderProjectionResponse getTweetHeaderProjectionResponse(Page<TweetProjection> tweets) {
        List<TweetProjectionResponse> tweetResponses = convertListToProjectionResponse(tweets.getContent());
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(tweets.getTotalPages()));
        return new TweetHeaderProjectionResponse(tweetResponses, responseHeaders);
    }

    public TweetHeaderProjectionResponse getTweets(Pageable pageable) {
        return getTweetHeaderProjectionResponse(tweetService.getTweets(pageable));
    }

    public TweetHeaderProjectionResponse getMediaTweets(Pageable pageable) {
        return getTweetHeaderProjectionResponse(tweetService.getMediaTweets(pageable));
    }

    public TweetHeaderProjectionResponse getTweetsWithVideo(Pageable pageable) {
        return getTweetHeaderProjectionResponse(tweetService.getTweetsWithVideo(pageable));
    }

    public List<TweetProjectionResponse> getScheduledTweets() {
        return convertListToProjectionResponse(tweetService.getScheduledTweets());
    }

    public TweetProjectionResponse getTweetById(Long tweetId) {
        return convertToProjectionResponse(tweetService.getTweetById(tweetId));
    }

    public TweetProjectionResponse createTweet(TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.createNewTweet(convertToTweetEntity(tweetRequest)));
    }

    public TweetProjectionResponse createPoll(TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.createPoll(tweetRequest.getPollDateTime(), tweetRequest.getChoices(),
                convertToTweetEntity(tweetRequest)));
    }

    public TweetProjectionResponse updateScheduledTweet(TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.updateScheduledTweet(convertToTweetEntity(tweetRequest)));
    }

    public String deleteScheduledTweets(TweetDeleteRequest tweetRequest) {
        return tweetService.deleteScheduledTweets(tweetRequest.getTweetsIds());
    }

    public TweetProjectionResponse deleteTweet(Long tweetId) {
        Tweet tweet = tweetService.deleteTweet(tweetId);
        TweetProjectionResponse tweetResponse = modelMapper.map(tweet, TweetProjectionResponse.class);
        tweetResponse.setTweetDeleted(true);
        return tweetResponse;
    }

    public NotificationProjectionResponse likeTweet(Long tweetId) {
        Map<String, Object> notificationDetails = tweetService.likeTweet(tweetId);
        NotificationProjectionResponse notification = modelMapper.map(notificationDetails.get("notification"), NotificationProjectionResponse.class);
        notification.getTweet().setNotificationCondition((Boolean) notificationDetails.get("isTweetLiked"));
        return notification;
    }

    public NotificationProjectionResponse retweet(Long tweetId) {
        Map<String, Object> notificationDetails = tweetService.retweet(tweetId);
        NotificationProjectionResponse notification = modelMapper.map(notificationDetails.get("notification"), NotificationProjectionResponse.class);
        notification.getTweet().setNotificationCondition((Boolean) notificationDetails.get("isTweetRetweeted"));
        return notification;
    }

    public List<TweetProjectionResponse> searchTweets(String text) {
        return convertListToProjectionResponse(tweetService.searchTweets(text));
    }

    public TweetProjectionResponse replyTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.replyTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }

    public TweetProjectionResponse quoteTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.quoteTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }

    public TweetProjectionResponse changeTweetReplyType(Long tweetId, ReplyType replyType) {
        return convertToProjectionResponse(tweetService.changeTweetReplyType(tweetId, replyType));
    }

    public TweetProjectionResponse voteInPoll(VoteRequest voteRequest) {
        return convertToProjectionResponse(tweetService.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollId(), voteRequest.getPollChoiceId()));
    }
}
