package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;

import java.util.List;

public interface TweetService {
    List<Tweet> getTweets();

    Tweet getTweetById(Long tweetId);

    List<Tweet> getTweetsByUser(User user);

    List<Tweet> createTweet(Tweet tweet);

    List<Tweet> deleteTweet(Long tweetId);

    Tweet likeTweet(Long tweetId);

    Tweet retweet(Long tweetId);
}
