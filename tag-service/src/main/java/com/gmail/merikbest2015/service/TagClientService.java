package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.models.Tag;

import java.util.List;

public interface TagClientService {

    List<Tag> getTagsByTweetId(Long tweetId);

    Tag getTagByTagName(String tagName);

    Tag saveTag(Tag tag);

    void deleteTag(Tag tag);
}
