package com.gmail.merikbest2015.commons.dto.commons_new;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.commons.dto.ImageResponse;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatTweetResponse {
    private Long id;
    private String text;
    private LocalDateTime dateTime;
    private TweetUserResponse user;
    @JsonProperty("isDeleted")
    private boolean isDeleted;

    @Data
    static class TweetUserResponse {
        private Long id;
        private String fullName;
        private String username;
        private ImageResponse avatar;
    }
}
