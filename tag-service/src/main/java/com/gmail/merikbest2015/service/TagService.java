package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.projection.TagProjection;
import com.gmail.merikbest2015.projection.TweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TagService {

    List<TagProjection> getTags();

    Page<TagProjection> getTrends(Pageable pageable);

    List<TweetProjection> getTweetsByTag(String tagName);
}
