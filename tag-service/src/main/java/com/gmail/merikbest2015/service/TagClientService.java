package com.gmail.merikbest2015.service;

public interface TagClientService {

    void parseHashtagsInText(String text, Long tweetId);

    void deleteTagsByTweetId(Long tweetId);
}
