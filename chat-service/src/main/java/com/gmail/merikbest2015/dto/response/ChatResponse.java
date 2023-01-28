package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.ChatUserParticipantResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ChatResponse {
    private Long id;
    private LocalDateTime creationDate;
    private List<ParticipantResponse> participants;

    @Getter
    @Setter
    static class ParticipantResponse {
        private Long id;
        private ChatUserParticipantResponse user;

        @JsonProperty("isLeftChat")
        private boolean leftChat;
    }
}
