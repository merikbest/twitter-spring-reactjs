package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Notification;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;

import java.util.List;

public interface TweetService {

    List<Tweet> getTweets();

    Tweet getTweetById(Long tweetId);

    List<Tweet> getMediaTweets();

    Tweet createTweet(Tweet tweet);

    Tweet createPoll(Long pollDateTime, List<String> choices, Tweet tweet);

    String deleteTweet(Long tweetId);

    List<Tweet> searchTweets(String text);

    Notification likeTweet(Long tweetId);

    Notification retweet(Long tweetId);

    Tweet replyTweet(Long tweetId, Tweet reply);

    Tweet changeTweetReplyType(Long tweetId, ReplyType replyType);

    Tweet voteInPoll(Long tweetId, Long pollChoiceId);
}
