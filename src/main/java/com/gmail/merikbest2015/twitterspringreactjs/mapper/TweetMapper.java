package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationReplyResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.NotificationType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
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
//    Class<T> type1 = TweetResponse.class
//    Class<S> type2 = TweetProjection.class

    <T, S> S convertToProjectionResponse2(T tweet, Class<S> type) {
        return modelMapper.map(tweet, type);
    }

    <T, S> List<S> convertListToProjectionResponse2(List<T> tweets, Class<S> type) {
        return tweets.stream()
                .map(tweet -> convertToProjectionResponse2(tweet, type))
                .collect(Collectors.toList());
    }

    <T, S> TweetHeaderResponse<S> getTweetHeaderResponse(Page<T> pageableTweets, Class<S> type) {
        List<S> tweetResponses = convertListToProjectionResponse2(pageableTweets.getContent(), type);
        return constructTweetHeaderResponse(tweetResponses, pageableTweets.getTotalPages());
    }

    <T, S> TweetHeaderResponse<S> getTweetHeaderResponse(List<T> tweets, Integer totalPages, Class<S> type) {
        List<S> tweetResponses = convertListToProjectionResponse2(tweets, type);
        return constructTweetHeaderResponse(tweetResponses, totalPages);
    }

    <S> TweetHeaderResponse<S> constructTweetHeaderResponse(List<S> tweetResponses, Integer totalPages) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        return new TweetHeaderResponse<S>(tweetResponses, responseHeaders);
    }

    public TweetHeaderResponse<TweetResponse> getTweets(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getTweets(pageable);
        return getTweetHeaderResponse(tweets, TweetResponse.class);
    }

    public TweetHeaderResponse<TweetResponse> getMediaTweets(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getMediaTweets(pageable);
        return getTweetHeaderResponse(tweets, TweetResponse.class);
    }

    public TweetHeaderResponse<TweetResponse> getTweetsWithVideo(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getTweetsWithVideo(pageable);
        return getTweetHeaderResponse(tweets, TweetResponse.class);
    }

    public List<TweetResponse> getScheduledTweets() {
        List<TweetProjection> tweets = tweetService.getScheduledTweets();
        return convertListToProjectionResponse2(tweets, TweetResponse.class);
    }

    public TweetResponse getTweetById(Long tweetId) {
        TweetProjection tweet = tweetService.getTweetById(tweetId);
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }

    public TweetResponse createTweet(TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.createNewTweet(convertToTweetEntity(tweetRequest));
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }

    public TweetResponse createPoll(TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.createPoll(tweetRequest.getPollDateTime(), tweetRequest.getChoices(), convertToTweetEntity(tweetRequest));
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }

    public TweetResponse updateScheduledTweet(TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.updateScheduledTweet(convertToTweetEntity(tweetRequest));
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }

    public String deleteScheduledTweets(TweetDeleteRequest tweetRequest) {
        return tweetService.deleteScheduledTweets(tweetRequest.getTweetsIds());
    }

    public TweetResponse deleteTweet(Long tweetId) {
        Tweet tweet = tweetService.deleteTweet(tweetId);
        TweetResponse tweetResponse = convertToProjectionResponse2(tweet, TweetResponse.class);
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
        List<TweetProjection> tweets = tweetService.searchTweets(text);
        return convertListToProjectionResponse2(tweets, TweetResponse.class);
    }

    public NotificationReplyResponse replyTweet(Long tweetId, TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.replyTweet(tweetId, convertToTweetEntity(tweetRequest));
        TweetResponse replyTweet = convertToProjectionResponse2(tweet, TweetResponse.class);
        NotificationReplyResponse notificationReplyResponse = new NotificationReplyResponse();
        notificationReplyResponse.setTweetId(tweetId);
        notificationReplyResponse.setNotificationType(NotificationType.REPLY);
        notificationReplyResponse.setTweet(replyTweet);
        return notificationReplyResponse;
    }

    public TweetResponse quoteTweet(Long tweetId, TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.quoteTweet(tweetId, convertToTweetEntity(tweetRequest));
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }

    public TweetResponse changeTweetReplyType(Long tweetId, ReplyType replyType) {
        TweetProjection tweet = tweetService.changeTweetReplyType(tweetId, replyType);
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }

    public TweetResponse voteInPoll(VoteRequest voteRequest) {
        TweetProjection tweet = tweetService.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollId(), voteRequest.getPollChoiceId());
        return convertToProjectionResponse2(tweet, TweetResponse.class);
    }
}
