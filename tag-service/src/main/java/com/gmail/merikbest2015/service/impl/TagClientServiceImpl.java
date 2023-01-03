package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.models.Tag;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.service.TagClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagClientServiceImpl implements TagClientService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTagsByTweetId(Long tweetId) {
        return tagRepository.findByTweets_Id(tweetId);
    }

    @Override
    public Tag getTagByTagName(String tagName) {
        return tagRepository.findByTagName(tagName);
    }

    @Override
    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public void deleteTag(Tag tag) {
        tagRepository.delete(tag);
    }
}
