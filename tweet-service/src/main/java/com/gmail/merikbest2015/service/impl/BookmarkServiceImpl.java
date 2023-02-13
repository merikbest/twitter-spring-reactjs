package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.Bookmark;
import com.gmail.merikbest2015.repository.BookmarkRepository;
import com.gmail.merikbest2015.repository.projection.BookmarkProjection;
import com.gmail.merikbest2015.service.BookmarkService;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final TweetServiceHelper tweetServiceHelper;

    @Override
    public Page<BookmarkProjection> getUserBookmarks(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return bookmarkRepository.getUserBookmarks(authUserId, pageable);
    }

    @Override
    public Boolean processUserBookmarks(Long tweetId) {
        tweetServiceHelper.checkValidTweet(tweetId);
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Bookmark bookmark = bookmarkRepository.getUserBookmark(authUserId, tweetId);

        if (bookmark != null) {
            bookmarkRepository.delete(bookmark);
            return false;
        } else {
            Bookmark newBookmark = new Bookmark(authUserId, tweetId);
            bookmarkRepository.save(newBookmark);
            return true;
        }
    }

    @Override
    public Boolean getIsTweetBookmarked(Long tweetId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return bookmarkRepository.isUserBookmarkedTweet(authUserId, tweetId);
    }
}
