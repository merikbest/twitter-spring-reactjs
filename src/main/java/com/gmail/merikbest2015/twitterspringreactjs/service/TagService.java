package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tag.TagProjection;

import java.util.List;

public interface TagService {
    List<TagProjection> getTags();

    List<TagProjection> getTrends();

    List<TweetProjection> getTweetsByTag(String tagName);
}
