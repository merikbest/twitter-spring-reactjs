package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.chats;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ChatProjectionResponse {
    private Long id;
    private LocalDateTime creationDate;
    private List<ParticipantProjectionResponse> participants;

    @Getter
    @Setter
    static class ParticipantProjectionResponse {
        private ChatUserProjection user;

        @Getter
        @Setter
        static class ChatUserProjection {
            private Long id;
            private String fullName;
            private String username;
            private ImageProjectionResponse avatar;
        }
    }
}
