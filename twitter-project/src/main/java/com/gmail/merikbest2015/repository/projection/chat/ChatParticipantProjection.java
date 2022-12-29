package com.gmail.merikbest2015.repository.projection.chat;

public interface ChatParticipantProjection {
    Long getId();
    boolean getLeftChat();
    ChatProjection getChat();
    ChatUserProjection getUser();

    interface ChatUserProjection {
        Long getId();
    }
}
