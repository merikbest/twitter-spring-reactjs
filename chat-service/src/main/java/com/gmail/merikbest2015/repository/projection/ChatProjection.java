package com.gmail.merikbest2015.repository.projection;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatProjection {
    Long getId();
    LocalDateTime getCreationDate();
    List<ChatParticipantProjection> getParticipants();

    interface ChatParticipantProjection {
        ChatUserParticipantProjection getUser();
        boolean getLeftChat();
    }
}
