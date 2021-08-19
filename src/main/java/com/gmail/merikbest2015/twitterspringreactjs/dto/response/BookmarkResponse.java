package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookmarkResponse {
    private Long id;
    private LocalDateTime bookmarkDate;
    private CommonTweetResponse tweet;
}
