package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
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

    TweetResponse convertToProjectionResponse(TweetProjection tweet) {
        return modelMapper.map(tweet, TweetResponse.class);
    }

    List<TweetResponse> convertListToProjectionResponse(List<TweetProjection> tweets) {
        return tweets.stream()
                .map(this::convertToProjectionResponse)
                .collect(Collectors.toList());
    }

    TweetHeaderResponse getTweetHeaderProjectionResponse(Page<TweetProjection> tweets) {
        List<TweetResponse> tweetResponses = convertListToProjectionResponse(tweets.getContent());
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(tweets.getTotalPages()));
        return new TweetHeaderResponse(tweetResponses, responseHeaders);
    }

    public TweetHeaderResponse getTweets(Pageable pageable) {
        return getTweetHeaderProjectionResponse(tweetService.getTweets(pageable));
    }

    public TweetHeaderResponse getMediaTweets(Pageable pageable) {
        return getTweetHeaderProjectionResponse(tweetService.getMediaTweets(pageable));
    }

    public TweetHeaderResponse getTweetsWithVideo(Pageable pageable) {
        return getTweetHeaderProjectionResponse(tweetService.getTweetsWithVideo(pageable));
    }

    public List<TweetResponse> getScheduledTweets() {
        return convertListToProjectionResponse(tweetService.getScheduledTweets());
    }

    public TweetResponse getTweetById(Long tweetId) {
        return convertToProjectionResponse(tweetService.getTweetById(tweetId));
    }

    public TweetResponse createTweet(TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.createNewTweet(convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse createPoll(TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.createPoll(tweetRequest.getPollDateTime(), tweetRequest.getChoices(),
                convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse updateScheduledTweet(TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.updateScheduledTweet(convertToTweetEntity(tweetRequest)));
    }

    public String deleteScheduledTweets(TweetDeleteRequest tweetRequest) {
        return tweetService.deleteScheduledTweets(tweetRequest.getTweetsIds());
    }

    public TweetResponse deleteTweet(Long tweetId) {
        Tweet tweet = tweetService.deleteTweet(tweetId);
        TweetResponse tweetResponse = modelMapper.map(tweet, TweetResponse.class);
        tweetResponse.setTweetDeleted(true);
        return tweetResponse;
    }

    public NotificationResponse likeTweet(Long tweetId) {
        Map<String, Object> notificationDetails = tweetService.likeTweet(tweetId);
        NotificationResponse notification = modelMapper.map(notificationDetails.get("notification"), NotificationResponse.class);
        notification.getTweet().setNotificationCondition((Boolean) notificationDetails.get("isTweetLiked"));
        return notification;
    }

    public NotificationResponse retweet(Long tweetId) {
        Map<String, Object> notificationDetails = tweetService.retweet(tweetId);
        NotificationResponse notification = modelMapper.map(notificationDetails.get("notification"), NotificationResponse.class);
        notification.getTweet().setNotificationCondition((Boolean) notificationDetails.get("isTweetRetweeted"));
        return notification;
    }

    public List<TweetResponse> searchTweets(String text) {
        return convertListToProjectionResponse(tweetService.searchTweets(text));
    }

    public TweetResponse replyTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.replyTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse quoteTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToProjectionResponse(tweetService.quoteTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }

    public TweetResponse changeTweetReplyType(Long tweetId, ReplyType replyType) {
        return convertToProjectionResponse(tweetService.changeTweetReplyType(tweetId, replyType));
    }

    public TweetResponse voteInPoll(VoteRequest voteRequest) {
        return convertToProjectionResponse(tweetService.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollId(), voteRequest.getPollChoiceId()));
    }
}
