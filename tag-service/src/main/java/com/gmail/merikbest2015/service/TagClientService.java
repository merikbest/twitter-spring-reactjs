package com.gmail.merikbest2015.service;

import java.util.List;

public interface TagClientService {

    List<String> getTagsByText(String text);

    void parseHashtagsFromText(Long tweetId, String text);

    void deleteTagsByTweetId(Long tweetId);
}
