package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Notification;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TweetService {

    Page<Tweet> getTweets(Pageable pageable);

    Tweet getTweetById(Long tweetId);

    Page<Tweet> getMediaTweets(Pageable pageable);

    Page<Tweet> getTweetsWithVideo(Pageable pageable);

    List<Tweet> getScheduledTweets();

    Tweet createTweet(Tweet tweet);

    Tweet createPoll(Long pollDateTime, List<String> choices, Tweet tweet);

    Tweet updateScheduledTweet(Tweet tweetInfo);

    String deleteScheduledTweets(List<Long> tweetsIds);

    Tweet deleteTweet(Long tweetId);

    List<Tweet> searchTweets(String text);

    Notification likeTweet(Long tweetId);

    Notification retweet(Long tweetId);

    Tweet replyTweet(Long tweetId, Tweet reply);

    Tweet quoteTweet(Long tweetId, Tweet quote);

    Tweet changeTweetReplyType(Long tweetId, ReplyType replyType);

    Tweet voteInPoll(Long tweetId, Long pollChoiceId);
}
