package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private ChatTweetResponse tweet;
    private AuthorResponse author;
    private ChatResponse chat;

    @Data
    public static class AuthorResponse {
        private Long id;
    }

    @Data
    public static class ChatResponse {
        private Long id;
    }
}
