package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chat;

import lombok.Data;

@Data
public class ChatParticipantResponse {
    private Long id;
    private boolean leftChat;
    private ChatResponse chat;
    private ChatUserResponse user;
}
