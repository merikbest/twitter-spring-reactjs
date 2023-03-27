package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.mapper.BookmarkMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_TWEETS)
public class BookmarkController {

    private final BookmarkMapper bookmarkMapper;

    @GetMapping(USER_BOOKMARKS)
    public ResponseEntity<List<TweetResponse>> getUserBookmarks(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = bookmarkMapper.getUserBookmarks(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(USER_BOOKMARKS_TWEET_ID)
    public ResponseEntity<Boolean> processUserBookmarks(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(bookmarkMapper.processUserBookmarks(tweetId));
    }

    @GetMapping(TWEET_ID_BOOKMARKED)
    public ResponseEntity<Boolean> getIsTweetBookmarked(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(bookmarkMapper.getIsTweetBookmarked(tweetId));
    }
}
