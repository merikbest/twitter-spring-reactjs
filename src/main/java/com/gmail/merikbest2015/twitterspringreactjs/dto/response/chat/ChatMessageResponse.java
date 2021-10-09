package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chat;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private ChatTweetResponse tweet;
    private ChatParticipantResponse author;
    private ChatResponse chat;
}
