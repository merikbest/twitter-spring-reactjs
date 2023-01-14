package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.repository.projection.TagProjection;
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
//    private final TweetClient tweetClient;

    @Override
    public List<TagProjection> getTags() {
        return tagRepository.findTop5ByOrderByTweetsQuantityDesc();
    }

    @Override
    public Page<TagProjection> getTrends(Pageable pageable) {
        return tagRepository.findByOrderByTweetsQuantityDesc(pageable);
    }

    @Override
    public List<TweetResponse> getTweetsByTag(String tagName) {
//        return tweetClient.getTweetsByTagName(tagName);
        return null;
    }
}
