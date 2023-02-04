package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.repository.projection.BookmarkProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookmarkService {

    Page<BookmarkProjection> getUserBookmarks(Pageable pageable);

    Boolean processUserBookmarks(Long tweetId);

    Boolean getIsTweetBookmarked(Long tweetId);
}
