package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TweetService {
    List<Tweet> getTweets();

    Tweet getTweetById(Long tweetId);

    List<Tweet> createTweet(Tweet tweet, MultipartFile multipartFile);

    List<Tweet> deleteTweet(Long tweetId);
}
