package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chat;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private TweetResponse tweet;
    private ChatParticipantResponse author;
    private ChatResponse chat;
}
