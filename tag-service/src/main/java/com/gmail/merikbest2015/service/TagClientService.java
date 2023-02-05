package com.gmail.merikbest2015.service;

public interface TagClientService {

    void parseHashtagsInText(Long tweetId, String text);

    void deleteTagsByTweetId(Long tweetId);
}
