package com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.enums.LinkCoverSize;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class QuoteTweetResponse {
    private Long id;
    private String text;
    private LocalDateTime dateTime;
    private String link;
    private String linkTitle;
    private String linkDescription;
    private String linkCover;
    private LinkCoverSize linkCoverSize;
    private UserTweetResponse user;
    @JsonProperty("isDeleted")
    private boolean isDeleted;

    public QuoteTweetResponse(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
