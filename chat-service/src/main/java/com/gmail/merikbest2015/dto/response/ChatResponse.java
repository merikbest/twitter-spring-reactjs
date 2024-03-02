package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ChatResponse {
    private Long id;
    private LocalDateTime creationDate;
    private List<ParticipantResponse> participants;

    @Data
    public static class ParticipantResponse {
        private ChatUserParticipantResponse user;

        @JsonProperty("isLeftChat")
        private boolean leftChat;
    }
}
