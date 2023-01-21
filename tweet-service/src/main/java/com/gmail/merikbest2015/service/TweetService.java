package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.repository.projection.TweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TweetService {

    Page<TweetProjection> getTweets(Pageable pageable);

//    TweetProjection getTweetById(Long tweetId);
//
//    TweetAdditionalInfoProjection getTweetAdditionalInfoById(Long tweetId);
//
//    List<TweetProjection> getRepliesByTweetId(Long tweetId);
//
//    Page<TweetProjection> getQuotesByTweetId(Pageable pageable, Long tweetId);
//
//    Page<UserProjection> getLikedUsersByTweetId(Long tweetId, Pageable pageable);
//
//    Page<UserProjection> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable);
//
//    Page<TweetProjection> getMediaTweets(Pageable pageable);
//
//    Page<TweetProjection> getTweetsWithVideo(Pageable pageable);
//
//    Page<TweetProjection> getFollowersTweets(Pageable pageable);
//
//    Page<TweetProjection> getScheduledTweets(Pageable pageable);
//
//    TweetProjection createNewTweet(Tweet tweet);
//
//    TweetProjection createPoll(Long pollDateTime, List<String> choices, Tweet tweet);
//
//    TweetProjection updateScheduledTweet(Tweet tweetInfo);
//
//    String deleteScheduledTweets(List<Long> tweetsIds);
//
//    String deleteTweet(Long tweetId);
//
//    Page<TweetProjection> searchTweets(String text, Pageable pageable);
//
//    Map<String, Object> likeTweet(Long tweetId);
//
//    Map<String, Object> retweet(Long tweetId);
//
//    TweetProjection replyTweet(Long tweetId, Tweet reply);
//
//    TweetProjection quoteTweet(Long tweetId, Tweet quote);
//
//    TweetProjection changeTweetReplyType(Long tweetId, ReplyType replyType);
//
//    TweetProjection voteInPoll(Long tweetId, Long pollId, Long pollChoiceId);
//
//    Boolean getIsTweetBookmarked(Long tweetId);
}
