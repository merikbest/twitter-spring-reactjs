package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.dto.ChatTweetResponse;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private Long authorId;
    private ChatTweetResponse tweet;
    private ChatResponse chat;

    @Data
    static class ChatResponse {
        private Long id;
    }
}
