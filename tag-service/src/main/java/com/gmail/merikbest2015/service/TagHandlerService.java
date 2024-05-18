package com.gmail.merikbest2015.service;

public interface TagHandlerService {

    void parseHashtag(Long tweetId, String tweetText);

    void deleteTag(Long tweetId);
}
