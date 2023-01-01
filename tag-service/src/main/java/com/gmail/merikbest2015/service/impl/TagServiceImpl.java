package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.client.tweet.TweetClient;
import com.gmail.merikbest2015.projection.TagProjection;
import com.gmail.merikbest2015.projection.TweetProjection;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TweetClient tweetClient;

    @Override
    public List<TagProjection> getTags() {
        return tagRepository.findTop5ByOrderByTweetsQuantityDesc();
    }

    @Override
    public Page<TagProjection> getTrends(Pageable pageable) {
        return tagRepository.findByOrderByTweetsQuantityDesc(pageable);
    }

    @Override
    public List<TweetProjection> getTweetsByTag(String tagName) {
        return tweetClient.getTweetsByTagName(tagName);
    }
}
