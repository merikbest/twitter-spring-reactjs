package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

@Data
public class ChatParticipantResponse {
    private Long id;
    private boolean leftChat;
//    private ChatResponse chat;
    private UserResponseCommon user;
}
