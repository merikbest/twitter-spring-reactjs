package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

@Data
public class ChatParticipantResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private ImageResponse avatar;
}
