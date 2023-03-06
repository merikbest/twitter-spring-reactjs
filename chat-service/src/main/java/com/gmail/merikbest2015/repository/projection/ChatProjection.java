package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatProjection {
    Long getId();
    LocalDateTime getCreationDate();
    List<ChatParticipantProjection> getParticipants();

    interface ChatParticipantProjection {
        Long getId();
        Long getUserId();

        @Value("#{@chatServiceHelper.getChatParticipant(target.userId)}")
        ChatUserParticipantResponse getUser();
        boolean getLeftChat();
    }
}
