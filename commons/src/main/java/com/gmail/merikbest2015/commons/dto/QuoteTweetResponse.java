package com.gmail.merikbest2015.commons.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.commons.enums.LinkCoverSize;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
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
}
