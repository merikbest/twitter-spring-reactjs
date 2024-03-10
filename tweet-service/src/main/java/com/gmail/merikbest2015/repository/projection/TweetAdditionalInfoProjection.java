package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.enums.ReplyType;

public interface TweetAdditionalInfoProjection {
    String getText();
    ReplyType getReplyType();
    Long getAddressedTweetId();
    boolean isDeleted();
    TweetAdditionalInfoUserProjection getAuthor();
}
