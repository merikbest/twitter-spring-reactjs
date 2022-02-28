package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatProjection {
    Long getId();
    LocalDateTime getCreationDate();
    List<NestedChatParticipantProjection> getParticipants();

    interface NestedChatParticipantProjection {
        Long getId();
        ChatUserProjection getUser();

        interface ChatUserProjection {
            Long getId();
            String getFullName();
            String getUsername();
            ImageProjection getAvatar();

            @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
            boolean getIsUserBlocked();
        }
    }
}
