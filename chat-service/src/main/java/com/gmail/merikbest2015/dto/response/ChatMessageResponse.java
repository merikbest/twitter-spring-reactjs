package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gmail.merikbest2015.dto.ChatTweetResponse;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ChatMessageResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private Long authorId;
    private ChatTweetResponse tweet;
    private ChatResponse chat;
    @JsonIgnore
    private List<Long> chatParticipantsIds;

    @Data
    static class ChatResponse {
        private Long id;
    }
}
