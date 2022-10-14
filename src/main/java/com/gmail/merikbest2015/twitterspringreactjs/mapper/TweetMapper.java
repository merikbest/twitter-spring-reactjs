package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationReplyResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.HeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.enums.NotificationType;
import com.gmail.merikbest2015.twitterspringreactjs.enums.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class TweetMapper {

    private final BasicMapper basicMapper;
    private final TweetService tweetService;

    public HeaderResponse<TweetResponse> getTweets(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getTweets(pageable);
        return basicMapper.getTweetHeaderResponse(tweets);
    }

    public HeaderResponse<TweetResponse> getMediaTweets(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getMediaTweets(pageable);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }

    public HeaderResponse<TweetResponse> getTweetsWithVideo(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getTweetsWithVideo(pageable);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }
    
    public HeaderResponse<TweetResponse> getFollowersTweets(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getFollowersTweets(pageable);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }

    public HeaderResponse<TweetResponse> getScheduledTweets(Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.getScheduledTweets(pageable);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }

    public TweetResponse getTweetById(Long tweetId) {
        TweetProjection tweet = tweetService.getTweetById(tweetId);
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    public List<TweetResponse> getRepliesByTweetId(Long tweetId) {
        List<TweetProjection> tweets = tweetService.getRepliesByTweetId(tweetId);
        return basicMapper.convertToResponseList(tweets, TweetResponse.class);
    }

    public HeaderResponse<TweetResponse> getQuotesByTweetId(Pageable pageable, Long tweetId) {
        Page<TweetProjection> tweets = tweetService.getQuotesByTweetId(pageable, tweetId);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }

    public HeaderResponse<UserResponse> getLikedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<UserProjection> users = tweetService.getLikedUsersByTweetId(tweetId, pageable);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public HeaderResponse<UserResponse> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<UserProjection> users = tweetService.getRetweetedUsersByTweetId(tweetId, pageable);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public TweetResponse createTweet(TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.createNewTweet(basicMapper.convertToEntity(tweetRequest, Tweet.class));
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    public TweetResponse createPoll(TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.createPoll(tweetRequest.getPollDateTime(), tweetRequest.getChoices(), basicMapper.convertToEntity(tweetRequest, Tweet.class));
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    public TweetResponse updateScheduledTweet(TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.updateScheduledTweet(basicMapper.convertToEntity(tweetRequest, Tweet.class));
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    public String deleteScheduledTweets(TweetDeleteRequest tweetRequest) {
        return tweetService.deleteScheduledTweets(tweetRequest.getTweetsIds());
    }

    public String deleteTweet(Long tweetId) {
        return tweetService.deleteTweet(tweetId);
    }

    public NotificationResponse likeTweet(Long tweetId) {
        Map<String, Object> notificationDetails = tweetService.likeTweet(tweetId);
        NotificationResponse notification = basicMapper.convertToResponse(notificationDetails.get("notification"), NotificationResponse.class);
        notification.getTweet().setNotificationCondition((Boolean) notificationDetails.get("isTweetLiked"));
        return notification;
    }

    public NotificationResponse retweet(Long tweetId) {
        Map<String, Object> notificationDetails = tweetService.retweet(tweetId);
        NotificationResponse notification = basicMapper.convertToResponse(notificationDetails.get("notification"), NotificationResponse.class);
        notification.getTweet().setNotificationCondition((Boolean) notificationDetails.get("isTweetRetweeted"));
        return notification;
    }

    public HeaderResponse<TweetResponse> searchTweets(String text, Pageable pageable) {
        Page<TweetProjection> tweets = tweetService.searchTweets(text, pageable);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }

    public NotificationReplyResponse replyTweet(Long tweetId, TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.replyTweet(tweetId, basicMapper.convertToEntity(tweetRequest, Tweet.class));
        TweetResponse replyTweet = basicMapper.convertToResponse(tweet, TweetResponse.class);
        NotificationReplyResponse notificationReplyResponse = new NotificationReplyResponse();
        notificationReplyResponse.setTweetId(tweetId);
        notificationReplyResponse.setNotificationType(NotificationType.REPLY);
        notificationReplyResponse.setTweet(replyTweet);
        return notificationReplyResponse;
    }

    public TweetResponse quoteTweet(Long tweetId, TweetRequest tweetRequest) {
        TweetProjection tweet = tweetService.quoteTweet(tweetId, basicMapper.convertToEntity(tweetRequest, Tweet.class));
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    public TweetResponse changeTweetReplyType(Long tweetId, ReplyType replyType) {
        TweetProjection tweet = tweetService.changeTweetReplyType(tweetId, replyType);
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    public TweetResponse voteInPoll(VoteRequest voteRequest) {
        TweetProjection tweet = tweetService.voteInPoll(voteRequest.getTweetId(), voteRequest.getPollId(), voteRequest.getPollChoiceId());
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }
}
