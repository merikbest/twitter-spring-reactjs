package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.repository.projection.TagProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TagService {

    List<TagProjection> getTags();

    Page<TagProjection> getTrends(Pageable pageable);

    List<TweetResponse> getTweetsByTag(String tagName);
}
