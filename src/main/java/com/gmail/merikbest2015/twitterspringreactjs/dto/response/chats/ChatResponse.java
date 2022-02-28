package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
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
        private UserParticipantResponse user;

        @Getter
        @Setter
        static class UserParticipantResponse {
            private Long id;
            private String fullName;
            private String username;
            private ImageResponse avatar;
            private boolean isUserBlocked;
        }
    }
}
