package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;

import java.util.List;

public interface TagService {
    List<Tag> getTags();

    List<Tag> getTrends();

    List<Tweet> getTweetsByTag(String tagName);
}
