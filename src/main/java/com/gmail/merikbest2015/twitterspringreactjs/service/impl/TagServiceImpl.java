package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TagRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findTop5ByOrderByTweetsQuantityDesc();
    }

    @Override
    public List<Tag> getTrends() {
        return tagRepository.findByOrderByTweetsQuantityDesc();
    }

    @Override
    public List<Tweet> getTweetsByTag(String tagName) {
        Tag tag = tagRepository.findByTagName(tagName);
        return tag.getTweets();
    }
}
